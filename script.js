// استيراد مكتبة Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// إعداد Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",  // ضع هنا الـ API Key الخاصة بك
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // ضع هنا الـ Project ID الخاص بك
    databaseURL: "https://chat-8fb4d-default-rtdb.firebaseio.com/",  // رابط قاعدة البيانات
    projectId: "YOUR_PROJECT_ID",  // ضع هنا الـ Project ID الخاص بك
    storageBucket: "YOUR_PROJECT_ID.appspot.com",  // ضع هنا الـ Storage Bucket الخاص بك
    messagingSenderId: "YOUR_SENDER_ID",  // ضع هنا الـ Sender ID الخاص بك
    appId: "YOUR_APP_ID"  // ضع هنا الـ App ID الخاص بك
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// دالة لإرسال الرسائل إلى Firebase
function sendMessageToFirebase(message) {
    const messageRef = ref(db, 'messages/' + Date.now());
    set(messageRef, {
        message: message,
        timestamp: Date.now()
    });
}

// دالة لتحميل الرسائل من Firebase
function loadMessagesFromFirebase() {
    const messagesRef = ref(db, 'messages');
    get(messagesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const messages = snapshot.val();
            const messagesContainer = document.getElementById('messages');
            messagesContainer.innerHTML = '';  // مسح الرسائل القديمة

            // عرض الرسائل الجديدة
            Object.keys(messages).forEach(key => {
                const message = messages[key];
                const messageContainer = document.createElement('div');
                messageContainer.classList.add('message');
                messageContainer.innerHTML = `
                    <p>${message.message}</p>
                    <button class="deleteBtn">حذف</button>
                `;
                messagesContainer.appendChild(messageContainer);
            });
        }
    }).catch((error) => {
        console.error(error);
    });
}

// تحميل الرسائل عند فتح الصفحة
loadMessagesFromFirebase();

// حدث إرسال الرسالة
document.getElementById('sendMessageBtn').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value.trim();

    if (message !== '') {
        sendMessageToFirebase(message);
        messageInput.value = '';  // مسح الحقل بعد الإرسال
        loadMessagesFromFirebase();  // تحديث الرسائل
    } else {
        alert('يرجى كتابة رسالة قبل الإرسال');
    }
});
