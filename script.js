// في ملف script.js
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
    } else {
        alert('يرجى كتابة رسالة قبل الإرسال');
    }
});

// حدث لحذف الرسائل
document.getElementById('messages').addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        event.target.parentElement.remove();
    }
});
