import React, { useState, useEffect, use } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Dùng để lấy icon mũi tên back
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const NumberInputScreen = () => {
  const [welcome, setWelcome] = useState('Welcome to our mobile app, please enter your phone number');
  const [rawPhone, setRawPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Alert.alert(welcome);
  },[])

  const key = [
        {num: '1', sub: ''}, {num: '2', sub: 'ABC'}, {num: '3', sub: 'DEF'}, {num: '-', sub: ''},
        {num: '4', sub: 'GHI'}, {num: '5', sub: 'JKL'}, {num: '6', sub: 'MNO'}, {num: 'space', sub: ''},
        {num: '7', sub: 'PQRS'}, {num: '8', sub: 'TUV'}, {num: '9', sub: 'WXYZ'}, {num: 'delete', sub: ''},
        {num: '*#', sub: ''}, {num: '0', sub: '+'}, {num: '.', sub: ''}, {num: 'confirm', sub: ''},
    ]
    const formatPhone = (digits) => {
      if (!digits) return '';
      if (digits.length <= 4) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
    };

    // Hàm validate (realtime + khi bấm tiếp tục)
    const validatePhone = (digits, { isFinal = false } = {}) => {
      if (!digits) return isFinal ? 'Vui lòng nhập số điện thoại' : '';
      if (!/^\d+$/.test(digits)) return 'Chỉ được nhập số';
      if (digits[0] !== '0') return 'Số điện thoại phải bắt đầu bằng số 0';
      if (isFinal) {
        if (digits.length !== 10) return 'Số điện thoại phải đủ 10 chữ số';
        return '';
      }
      if (digits.length < 10) return 'Số điện thoại chưa đủ 10 chữ số';
      return '';
    };

    const setPhone = (nextDigits) => {
      const digits = (nextDigits || '').replace(/\D/g, '').slice(0, 10);
      setRawPhone(digits);
      setFormattedPhone(formatPhone(digits));
      setError(validatePhone(digits));
    };

  // Hàm xử lý khi bấm số
  const onPressNumber = (num) => {
    if (!/^\d$/.test(num)) {
      setError('Chỉ được nhập số');
      return;
    }
    if (rawPhone.length >= 10) return;
    setPhone(rawPhone + num);
  };

  const onPressSpace = () => {
    // Auto format sẽ tự thêm khoảng trắng đúng chuẩn, không cho nhập thủ công
    setError('Không thể nhập khoảng trắng');
  };

  const onPressContinue = () => {
    const finalError = validatePhone(rawPhone, { isFinal: true });
    setError(finalError);
    if (finalError) {
      Alert.alert('Thông báo', finalError);
      return;
    }
    Alert.alert('Thành công', `Số điện thoại đã nhập: ${formatPhone(rawPhone)}`);
  };

  const onPressConfirm = () => {
    onPressContinue();
  };

  // Hàm xóa số (Backspace)
  const onPressDelete = () => {
      setPhone(rawPhone.slice(0, -1));
  };

  const renderKey = (item, index) => { 
    if (item.num === 'space' || item.num === 'confirm' || item.num === 'delete') {
      return (
        <TouchableOpacity 
          style={styles.key} 
          key={index} 
          onPress={() => {
            if (item.num === 'space') onPressSpace();
            else if (item.num === 'confirm') onPressConfirm();
            else onPressDelete();
          }}
        >
          {item.num === 'space' && <MaterialIcons name="space-bar" size={24} color="black" />}
          {item.num === 'delete' && <Ionicons name="backspace-outline" size={24} color="black" />}
          {item.num === 'confirm' && (
            <View style={styles.confirmCircle}>
              <MaterialIcons name="done" size={24} color="white" />
            </View>
          )}
        </TouchableOpacity>
      );
    }


    // Các nút số kèm chữ
    return (
      <TouchableOpacity 
        style={styles.key} 
        onPress={() => onPressNumber(item.num)} 
        key={index} 
      >
        <View style={styles.keyContainer}>
          <Text style={styles.keyText}>{item.num}</Text>
          {item.sub !== '' && (
            <Text style={styles.keySub}>{item.sub}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Header */}
      <View style={styles.header}>
        
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Đăng nhập</Text>
      </View>

      {/* Body */}
      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.subLabel}>Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro</Text>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.inputText, { color: error ? 'red' : 'green' }    ]}>
            {formattedPhone}
            <Text style={styles.cursor}>|</Text> 
          </Text>
        </View>
      </View>

      {error ? <Text style={{ color: 'red', marginLeft: 25 }}>{error}</Text> : null}

      {/* Footer: Button + Keypad */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.btnContinue, { backgroundColor: rawPhone.length === 10 && !error ? '#000' : '#E0E0E0' }]}
          onPress={onPressContinue}
        >
          <Text style={[styles.btnText, { color: rawPhone.length === 10 && !error ? '#fff' : '#000' }]}>Tiếp tục</Text>
        </TouchableOpacity>

        {/* Custom Numeric Keypad */}
        <View style={styles.keypadContainer}>
          <View style={styles.keypadGrid} >
            {key.map((item, index) => renderKey(item, index))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  content: { padding: 25 },
  label: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subLabel: { fontSize: 14, color: '#666', marginBottom: 30 },
  inputContainer: { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 10 },
  inputText: { fontSize: 24, letterSpacing: 2 },
  cursor: { color: '#007AFF', fontWeight: '100' },
  footer: { marginTop: 'auto' },
  btnContinue: { margin: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  keypadContainer: { backgroundColor: '#F2F2F2', paddingVertical: 10 },
  keypadGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  key: { width: '25%', height: 70, justifyContent: 'center', alignItems: 'center' },
  keyContainer: { alignItems: 'center', justifyContent: 'center', height: 50, width: '100%' },
  keyText: { fontSize: 24, fontWeight: '500', color: '#000' },
  keySub: { fontSize: 10, color: '#888', position: 'absolute', bottom: 18, left: '60%', fontWeight: '600' },
  confirmCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#62B4A2', justifyContent: 'center', alignItems: 'center', elevation: 2 },
});

export default () => {
  return (
    <SafeAreaProvider>
      <NumberInputScreen />
    </SafeAreaProvider>
  )
}