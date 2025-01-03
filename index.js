const express = require('express');
const emailExistence = require('email-existence');

const app = express();
const port = 3000;

// Middleware để phân tích JSON (không cần thiết với yêu cầu GET)
app.use(express.json());

// API kiểm tra email bằng phương thức GET
app.get('/check-email', (req, res) => {
  const { email } = req.query;  // Lấy email từ query parameters

  if (!email) {
    return res.status(400).send({ error: 'Email là bắt buộc' });
  }

  emailExistence.check(email, (err, response) => {
    if (err) {
      return res.status(500).send({ error: 'Lỗi khi xác minh email' });
    }

    if (response) {
      res.status(200).send({ status: '200', message: 'Email tồn tại và hợp lệ' });
    } else {
      res.status(200).send({ status: '404', message: 'Email không tồn tại' });
    }
  });
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
