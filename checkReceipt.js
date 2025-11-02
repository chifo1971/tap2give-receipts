const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, collection, getDocs, query, limit } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBKec1r2uSP_3Kv2NJ7UEOdI9-7VZX09zM",
  authDomain: "tap2give-c8a07.firebaseapp.com",
  projectId: "tap2give-c8a07",
  storageBucket: "tap2give-c8a07.firebasestorage.app",
  messagingSenderId: "911477909142",
  appId: "1:911477909142:web:de97f8f8588cc79b4644b7",
  measurementId: "G-CSJ4VLJMG2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkReceipt() {
  console.log('🔍 Checking receipt: DON-251102-8365\n');

  try {
    // Check if receipt exists
    const receiptRef = doc(db, 'receipts', 'DON-251102-8365');
    const receiptSnap = await getDoc(receiptRef);

    if (!receiptSnap.exists()) {
      console.log('❌ Receipt DON-251102-8365 does NOT exist in /receipts/\n');

      // List some recent receipts
      console.log('📋 Listing recent receipts:');
      const receiptsRef = collection(db, 'receipts');
      const q = query(receiptsRef, limit(5));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log('  ⚠️  No receipts found in collection!\n');
      } else {
        snapshot.forEach(doc => {
          const data = doc.data();
          console.log(`  - ${doc.id}`);
          console.log(`    Amount: $${data.amount}`);
          console.log(`    Mosque: ${data.mosqueCode}`);
          console.log(`    Created: ${new Date(data.createdAt.seconds * 1000).toLocaleString()}\n`);
        });
      }
    } else {
      const data = receiptSnap.data();
      console.log('✅ Receipt exists!');
      console.log(`   Mosque Code: ${data.mosqueCode}`);
      console.log(`   Amount: $${data.amount}`);
      console.log(`   Expired: ${Date.now() > data.expiresAt.seconds * 1000 ? 'YES ❌' : 'NO ✅'}\n`);

      // Check mosque
      console.log(`🕌 Checking mosque: ${data.mosqueCode}`);
      const mosqueRef = doc(db, 'mosques', data.mosqueCode);
      const mosqueSnap = await getDoc(mosqueRef);

      if (!mosqueSnap.exists()) {
        console.log(`❌ Mosque document /mosques/${data.mosqueCode} does NOT exist\n`);
      } else {
        const mosque = mosqueSnap.data();
        console.log('✅ Mosque exists!');
        console.log(`   Name: ${mosque.mosqueName}`);
        console.log(`   Tax ID: ${mosque.taxId || 'MISSING'}`);
        console.log(`   Address: ${mosque.address || 'MISSING'}`);
      }
    }

    // Always check if Cherif mosque exists
    console.log('\n🕌 Checking mosque: Cherif');
    const mosqueRef = doc(db, 'mosques', 'Cherif');
    const mosqueSnap = await getDoc(mosqueRef);

    if (!mosqueSnap.exists()) {
      console.log('❌ Mosque document /mosques/Cherif does NOT exist');
      console.log('\n📋 Listing available mosques:');
      const mosquesRef = collection(db, 'mosques');
      const snapshot = await getDocs(mosquesRef);

      if (snapshot.empty) {
        console.log('  ⚠️  No mosques found!\n');
      } else {
        snapshot.forEach(doc => {
          console.log(`  - ${doc.id}: ${doc.data().mosqueName}`);
        });
      }
    } else {
      const mosque = mosqueSnap.data();
      console.log('✅ Mosque Cherif exists!');
      console.log(`   Name: ${mosque.mosqueName}`);
      console.log(`   Brand Color: ${mosque.brandColor || 'DEFAULT'}`);
      console.log(`   Tax ID: ${mosque.taxId || 'MISSING ❌'}`);
      console.log(`   Address: ${mosque.address || 'MISSING ❌'}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  process.exit(0);
}

checkReceipt();
