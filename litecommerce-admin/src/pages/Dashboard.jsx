// src/pages/Dashboard.jsx
export default function Dashboard() {
    return (
        <div>
            <div className="app-content-header mb-4">
                <h3 className="mb-0">Bảng điều khiển</h3>
            </div>
            <div className="row">
                <div className="col-lg-3 col-6">
                    <div className="card text-bg-primary mb-3 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">150</h5>
                            <p className="card-text">Đơn hàng mới</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="card text-bg-success mb-3 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">53%</h5>
                            <p className="card-text">Tỷ lệ chuyển đổi</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="card text-bg-warning mb-3 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">44</h5>
                            <p className="card-text">Người dùng đăng ký</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-6">
                    <div className="card text-bg-danger mb-3 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">65</h5>
                            <p className="card-text">Khách truy cập</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
