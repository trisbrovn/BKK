// load_api_news.js

// **********************************************
// ** CHÚ Ý: THAY THẾ 'YOUR_API_KEY' BẰNG KHÓA API CỦA BẠN **
// **********************************************
const API_KEY = '59a2e09d65ff4ef998999e91db5b68ba'; 

// Endpoint để lấy tin nóng (top news) từ Việt Nam
const API_URL = `https://api.worldnewsapi.com/top-news?source-country=vn&language=vi&api-key=${API_KEY}`;

// Hàm định dạng ngày tháng (Ví dụ: 2025-10-15T15:00:00+07:00 -> 15/10/2025)
function formatPublishedDate(isoDateString) {
    try {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    } catch (e) {
        return 'N/A';
    }
}

// Hàm tạo thẻ tin tức (Bootstrap Card)
function createNewsCard(article) {
    const publishedDate = formatPublishedDate(article.publish_date);
    const sourceName = article.source_name || 'Nguồn không xác định';
    const imageUrl = article.image || 'https://via.placeholder.com/600x400?text=No+Image';

    return `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card h-100 shadow-sm">
                <img src="${imageUrl}" class="card-img-top" alt="${article.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${article.title}</h5>
                    <p class="card-text text-muted small mt-auto">
                        <i class="fa-solid fa-calendar-alt me-1"></i> ${publishedDate}
                        <span class="ms-3"><i class="fa-solid fa-circle-dot me-1"></i> ${sourceName}</span>
                    </p>
                    <a href="${article.url}" target="_blank" class="btn btn-primary mt-2">Xem chi tiết</a>
                </div>
            </div>
        </div>
    `;
}

// Hàm chính để tải và hiển thị tin tức
async function loadNews() {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '<div class="text-center w-100"><i class="fa-solid fa-spinner fa-spin fa-2x"></i> Đang tải tin tức...</div>';
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
             // Xử lý lỗi HTTP (ví dụ: 401 Unauthorized, 429 Rate Limit Exceeded)
            newsContainer.innerHTML = `<div class="alert alert-danger w-100" role="alert">
                Lỗi khi tải tin tức: ${response.status} ${response.statusText}. Vui lòng kiểm tra API Key hoặc giới hạn sử dụng.
            </div>`;
            return;
        }

        const data = await response.json();
        
        if (data.top_news && data.top_news.length > 0) {
            newsContainer.innerHTML = ''; // Xóa thông báo đang tải
            
            data.top_news.forEach(category => {
                category.news.forEach(article => {
                    newsContainer.innerHTML += createNewsCard(article);
                });
            });
        } else {
            newsContainer.innerHTML = '<div class="alert alert-warning w-100" role="alert">Không tìm thấy tin tức nào.</div>';
        }

    } catch (error) {
        console.error('Lỗi kết nối API:', error);
        newsContainer.innerHTML = `<div class="alert alert-danger w-100" role="alert">
            Không thể kết nối đến máy chủ API. Vui lòng kiểm tra kết nối mạng và Khóa API.
        </div>`;
    }
}

// Chạy hàm tải tin tức khi trang đã tải xong
document.addEventListener('DOMContentLoaded', loadNews);