// في ملف script.js

// دالة لحفظ الرسائل في LocalStorage
function saveMessages() {
    const messages = document.getElementById('messages').innerHTML;
    localStorage.setItem('messages', messages);
    localStorage.setItem('messageTime', new Date().getTime());  // حفظ الوقت الحالي
}

// دالة لتحميل الرسائل من LocalStorage
function loadMessages() {
    const savedMessages = localStorage.getItem('messages');
    const savedTime = localStorage.getItem('messageTime');
    if (savedMessages && savedTime) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - savedTime;
        
        // إذا كانت الرسائل محفوظة منذ أقل من 30 دقيقة، قم بتحميلها
        if (timeDifference < 30 * 60 * 1000) {
            document.getElementById('messages').innerHTML = savedMessages;
        } else {
            // إذا مر وقت أكثر من 30 دقيقة، قم بمسح الرسائل
            localStorage.removeItem('messages');
            localStorage.removeItem('messageTime');
        }
    }
}

// تحميل الرسائل عند فتح الصفحة
loadMessages();

// عند الضغط على زر "إرسال"
document.getElementById('sendMessageBtn').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value.trim();

    if (message !== '') {
        // إنشاء عنصر يحتوي على الرسالة
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('message');
        messageContainer.innerHTML = `
            <p>${message}</p>
            <button class="deleteBtn">حذف</button>
        `;

        // إضافة الرسالة إلى نافذة الرسائل
        document.getElementById('messages').appendChild(messageContainer);

        // مسح الحقل بعد الإرسال
        messageInput.value = ''; 

        // تحديث التمرير للأسفل لعرض الرسالة الجديدة
        var messagesContainer = document.getElementById('messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // حفظ الرسائل في LocalStorage
        saveMessages();

        // إظهار إشعار
        showNotification("تم إرسال الرسالة بنجاح!");
    } else {
        alert('يرجى كتابة رسالة قبل الإرسال');
    }
});

// حدث لحذف الرسائل
document.getElementById('messages').addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        event.target.parentElement.remove();
        // حفظ الرسائل بعد الحذف
        saveMessages();
    }
});

// دالة لإظهار إشعار بسيط
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// حدث لتغيير الصورة الشخصية
document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// تسجيل الصوت
let mediaRecorder;
let audioChunks = [];

document.getElementById('recordButton').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                document.getElementById('audioPlayer').src = audioUrl;

                // حفظ الرسالة الصوتية هنا...
            };

            mediaRecorder.start();
            setTimeout(() => {
                mediaRecorder.stop();
            }, 5000); // تسجيل لمدة 5 ثوانٍ كمثال
        });
});

// تعديل الاسم
document.getElementById('editNameBtn').addEventListener('click', function() {
    document.getElementById('userName').style.display = 'none';
    document.getElementById('userNameInput').style.display = 'block';
    document.getElementById('saveNameBtn').style.display = 'block';
    document.getElementById('cancelEditBtn').style.display = 'block';
});

document.getElementById('saveNameBtn').addEventListener('click', function() {
    const newName = document.getElementById('userNameInput').value;
    if (newName) {
        document.getElementById('displayName').textContent = newName;
        document.getElementById('userName').style.display = 'block';
        document.getElementById('userNameInput').style.display = 'none';
        document.getElementById('saveNameBtn').style.display = 'none';
        document.getElementById('cancelEditBtn').style.display = 'none';
    }
});

document.getElementById('cancelEditBtn').addEventListener('click', function() {
    document.getElementById('userName').style.display = 'block';
    document.getElementById('userNameInput').style.display = 'none';
    document.getElementById('saveNameBtn').style.display = 'none';
    document.getElementById('cancelEditBtn').style.display = 'none';
});
