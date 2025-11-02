const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

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

async function checkMosqueData() {
  console.log('🕌 Checking mosque: Cherif\n');

  try {
    const mosqueRef = doc(db, 'mosques', 'Cherif');
    const mosqueSnap = await getDoc(mosqueRef);

    if (!mosqueSnap.exists()) {
      console.log('❌ Mosque document does NOT exist\n');
      return;
    }

    const data = mosqueSnap.data();

    console.log('✅ Mosque document exists!\n');
    console.log('📋 FULL DOCUMENT DATA:');
    console.log(JSON.stringify(data, null, 2));

    console.log('\n\n🔍 FIELD CHECK:');
    console.log('mosqueName:', data.mosqueName !== undefined ? `"${data.mosqueName}"` : 'MISSING');
    console.log('mosqueCode:', data.mosqueCode !== undefined ? `"${data.mosqueCode}"` : 'MISSING');
    console.log('brandColor:', data.brandColor !== undefined ? `"${data.brandColor}"` : 'MISSING');
    console.log('logoUrl:', data.logoUrl !== undefined ? `"${data.logoUrl}"` : 'MISSING');
    console.log('taxId:', data.taxId !== undefined ? `"${data.taxId}"` : 'MISSING ❌ (Required for tax sections)');
    console.log('address:', data.address !== undefined ? `"${data.address}"` : 'MISSING ❌ (Required for org details)');
    console.log('contactEmail:', data.contactEmail !== undefined ? `"${data.contactEmail}"` : 'MISSING');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  process.exit(0);
}

checkMosqueData();
