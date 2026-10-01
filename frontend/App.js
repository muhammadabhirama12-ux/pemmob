import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

// Komponen Kartu menerima item melalui props
function Kartu({ item }) {
  return (
    <Text style={{ paddingVertical: 12 }}>
      {item.judul} - Rp {item.nominal}
    </Text>
  );
}

export default function App() {
  // Daftar awal dua pengeluaran
  const [items, setItems] = useState([
    { id: 1, judul: 'Makan siang', nominal: 20000 },
    { id: 2, judul: 'Bensin', nominal: 15000 },
  ]);

  // State untuk input judul dan nominal
  const [judul, setJudul] = useState('');
  const [nominal, setNominal] = useState('');

  function tambah() {
    if (!judul.trim() || !nominal.trim()) return;

    setItems((old) => [
      ...old,
      {
        id: Math.max(0, ...old.map((x) => x.id)) + 1,
        judul: judul.trim(),
        nominal: Number(nominal) || 0, // Mengubah input string nominal menjadi angka
      },
    ]);

    // Reset input setelah ditambah
    setJudul('');
    setNominal('');
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 60 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
        Pengeluaran Lokal
      </Text>

      {/* Input Judul Pengeluaran */}
      <TextInput
        value={judul}
        onChangeText={setJudul}
        placeholder="Judul pengeluaran"
        accessibilityLabel="Judul"
        style={{ borderWidth: 1, padding: 12, marginBottom: 8 }}
      />

      {/* Input Nominal Pengeluaran (Tugas Latihan) */}
      <TextInput
        value={nominal}
        onChangeText={setNominal}
        placeholder="Nominal pengeluaran (contoh: 10000)"
        keyboardType="numeric"
        accessibilityLabel="Nominal"
        style={{ borderWidth: 1, padding: 12, marginBottom: 16 }}
      />

      {/* Tombol Tambah */}
      <Button title="Tambah Pengeluaran" onPress={tambah} />

      {/* Daftar Pengeluaran */}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Kartu item={item} />}
        ListEmptyComponent={<Text>Belum ada pengeluaran.</Text>}
        style={{ marginTop: 16 }}
      />
    </View>
    
  );
}