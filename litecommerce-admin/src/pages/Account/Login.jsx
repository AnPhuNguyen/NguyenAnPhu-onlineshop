// src/pages/Account/Login.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginWithMockAccount, MOCK_ACCOUNTS } from '../../auth';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('employee@litecommerce.com');
    const [password, setPassword] = useState('123456');
    const [errorMessage, setErrorMessage] = useState('');

    // Đăng nhập bằng dữ liệu mẫu.
    const handleSubmit = (event) => {
        event.preventDefault();
        const result = loginWithMockAccount(email, password);

        if (!result.success) {
            setErrorMessage(result.message);
            return;
        }

        const redirectPath = location.state?.from?.pathname || '/';
        navigate(redirectPath, { replace: true });
    };

    const autoFill = (account) => {
        setEmail(account.email);
        setPassword(account.password);
        setErrorMessage('');
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
            <div className="card border-0 shadow-sm w-100" style={{ maxWidth: 520 }}>
                <div className="card-body p-4">
                    <h4 className="mb-3">Đăng nhập nhân viên</h4>
                    <p className="text-muted mb-4">LiteCommerce Admin (mock auth)</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input className="form-control" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu</label>
                            <input className="form-control" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        {errorMessage && <div className="alert alert-danger py-2">{errorMessage}</div>}
                        <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
                    </form>

                    {/* Bộ tài khoản mẫu để test nhanh */}
                    <div className="mt-4">
                        <p className="small fw-bold mb-2">Tài khoản test nhanh:</p>
                        <div className="d-flex flex-column gap-2">
                            {MOCK_ACCOUNTS.map((account) => (
                                <button
                                    key={account.email}
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary text-start"
                                    onClick={() => autoFill(account)}
                                >
                                    {account.email} ({account.roleNames})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
