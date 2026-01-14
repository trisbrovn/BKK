// data.js
// Mock data tin tức – dùng cho JSI (render, filter, search, state, API giả lập)

export const newsData = [
  {
    id: 1,
    title: "AI thay đổi cách học lập trình Web",
    description:
      "Trí tuệ nhân tạo đang được ứng dụng mạnh mẽ trong việc học và phát triển web hiện đại.",
    content:
      "AI giúp gợi ý code, phát hiện lỗi, tối ưu UI/UX và cá nhân hóa trải nghiệm học tập cho lập trình viên.",
    category: "Technology",
    author: "MindX Tech",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    publishedAt: "2025-01-10",
    views: 1520,
    isFeatured: true,
  },
  {
    id: 2,
    title: "JavaScript vẫn là ngôn ngữ phổ biến nhất 2025",
    description:
      "JavaScript tiếp tục giữ vị trí số 1 trong các ngôn ngữ lập trình phổ biến.",
    content:
      "Với sự phát triển của frontend, backend và AI, JavaScript ngày càng chứng tỏ vai trò quan trọng.",
    category: "Programming",
    author: "Dev Community",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    publishedAt: "2025-01-08",
    views: 2340,
    isFeatured: false,
  },
  {
    id: 3,
    title: "Xu hướng Frontend 2025",
    description:
      "Frontend tập trung vào hiệu năng, trải nghiệm người dùng và kiến trúc module.",
    content:
      "Các xu hướng nổi bật gồm: Component-based, SPA nhẹ, tối ưu Core Web Vitals.",
    category: "Frontend",
    author: "Web Trends",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    publishedAt: "2025-01-05",
    views: 980,
    isFeatured: true,
  },
  {
    id: 4,
    title: "LocalStorage và State Management thuần JS",
    description:
      "Quản lý trạng thái không cần framework vẫn rất hiệu quả.",
    content:
      "Sử dụng localStorage kết hợp module JS giúp xây dựng SPA đơn giản, dễ kiểm soát.",
    category: "JavaScript",
    author: "JS Master",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    publishedAt: "2025-01-02",
    views: 760,
    isFeatured: false,
  },
  {
    id: 5,
    title: "Học Web qua dự án thực tế",
    description:
      "Project-based learning giúp học viên tiến bộ nhanh hơn.",
    content:
      "Xây dựng các dự án như News App, ToDo App, Weather App giúp hiểu sâu DOM và logic.",
    category: "Education",
    author: "MindX",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    publishedAt: "2024-12-28",
    views: 1890,
    isFeatured: true,
  },
];
