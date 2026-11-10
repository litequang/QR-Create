# QRCode Studio Pro & Scientific QR Lab

Một ứng dụng tạo mã QR chuyên nghiệp thế hệ mới, tái hiện và nâng cấp toàn diện QRCode Monkey với giao diện Studio hiện đại, hỗ trợ đầy đủ các kiểu dữ liệu, tùy biến hình thái ma trận (body, eye frame, eye ball), màu sắc gradient, tích hợp logo và bổ sung bộ công cụ chẩn đoán cấu trúc ma trận (Reed-Solomon ECC, bit density, scan decoder) phục vụ nghiên cứu khoa học.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Các quyết định đã được xác nhận:**
> - **Định dạng xuất file:** Hỗ trợ đầy đủ PNG độ phân giải cực cao (tùy chỉnh 500px đến 4000px), SVG vector nguyên bản, PDF tài liệu in ấn và Sao chép ảnh trực tiếp vào Clipboard một chạm.
> - **Định hướng phong cách:** Giao diện Studio hiện đại với hỗ trợ chuyển đổi Light/Dark mode, bố cục 2 cột cân bằng chuẩn công thái học (Ergonomics), loại bỏ hoàn toàn chi tiết rườm rà (anti-slop), tập trung tối đa vào độ sắc nét và trải nghiệm điều khiển thông số.
> - **Tính năng nghiên cứu khoa học:** Bổ sung thanh công cụ "Scientific QR Matrix Inspector" giúp bóc tách các lớp cấu trúc: Finder Patterns, Timing Tracks, Alignment Markers, Format Info, và mô phỏng giải mã (Scan Simulator) để kiểm tra độ tương phản và khả năng phục hồi dữ liệu.

---

### 1. Overview & Core Concept

- **Mục tiêu:** Xây dựng một bản clone hoàn chỉnh và nâng tầm của QRCode Monkey (https://www.qrcode-monkey.com/), thay thế giao diện cũ kỹ bằng phong cách Design Studio cao cấp, mượt mà và trực quan.
- **Đối tượng sử dụng:** Nhà nghiên cứu khoa học, nhà phát triển phần mềm, chuyên gia thiết kế thương hiệu và người dùng doanh nghiệp cần tạo mã QR thẩm mỹ cao kèm dữ liệu phân tích chuyên sâu.
- **Giá trị cốt lõi:**
  1. **Đầy đủ 14+ loại nội dung:** URL, Text, WiFi, vCard, Email, Phone, SMS, Location, Social (Facebook, X, YouTube), Cryptocurrency (Bitcoin/ETH), Event.
  2. **Bộ tùy biến thẩm mỹ không giới hạn:** Single/Linear/Radial Gradient, tùy biến màu mắt độc lập (khung viền mắt & đồng tử), 12+ kiểu dáng thân ma trận (dots, rounded, squares, diamonds, leaves, scanlines), 8+ kiểu khung mắt, 8+ kiểu đồng tử.
  3. **Tích hợp Logo thông minh:** Tải lên logo tùy ý hoặc chọn từ thư viện biểu tượng thương hiệu (Web, WiFi, Phone, Social, Crypto...) kèm tính năng tự động xóa nền xung quanh logo ("Remove background behind logo") để chống nhiễu quét.
  4. **Scientific Lab Panel:** Kiểm tra ma trận bit (Grid size $21\times 21$ đến $177\times 177$), mức sửa lỗi Reed-Solomon (L: 7%, M: 15%, Q: 25%, H: 30%), tính toán tỷ lệ tương phản WCAG và tích hợp bộ giải mã quét QR ảo kiểm tra khả năng đọc tức thời.
  5. **Xuất file chuẩn đồ họa:** Xuất PNG độ phân giải lên tới 4000x4000px (300+ DPI cho in ấn khổ lớn), SVG Vector sắc nét đến từng đường cong bezier, PDF tài liệu và nút Copy nhanh ảnh vào khay nhớ tạm.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Khởi tạo nội dung:** Người dùng chọn loại dữ liệu qua thanh tab trượt mượt mà (URL, WiFi, vCard, v.v.). Form nhập liệu tương ứng hiển thị với các trường kiểm tra tính hợp lệ.
2. **Tùy biến diện mạo (Accordions/Panels):**
   - *Colors:* Chọn màu đơn sắc hoặc gradient (2 màu, góc xoay), màu nền hoặc trong suốt, màu mắt chuyên biệt. Cảnh báo tương phản màu tự động hiển thị nếu độ tương phản thấp.
   - *Logo:* Tải logo lên hoặc chọn biểu tượng từ thư viện, tinh chỉnh kích thước logo và bật/tắt viền bảo vệ.
   - *Design Shapes:* Chọn hình thái thân hạt QR (body dots), khung góc định vị (eye frame) và tâm mắt (eye ball).
   - *Presets:* Chọn nhanh các mẫu thiết kế phối sẵn (Clean Corporate, Cyber Emerald, Royal Indigo, Dark Velvet, Pastel Tech).
3. **Quan sát trực quan & Nghiên cứu khoa học (Live Preview & Inspector):**
   - Khung xem trước thời gian thực cố định bên phải (Sticky Canvas) cập nhật tức thì khi thay đổi thông số.
   - Công tắc chuyển đổi chế độ xem: **Design View** (Mã QR thành phẩm) $\longleftrightarrow$ **Matrix X-Ray View** (Tô màu phân biệt: 3 Finder Patterns góc, Timing Lines, Alignment Markers, Dữ liệu và Mã sửa sai Reed-Solomon).
   - Kiểm tra khả năng quét với bộ giải mã tích hợp: báo trạng thái "Scannable 100%" và hiển thị nội dung quét được.
4. **Xuất file:** Điều chỉnh thanh trượt độ phân giải (1000px – 4000px), nhấn tải về PNG / SVG / PDF hoặc sao chép ảnh vào Clipboard với thông báo Toast phản hồi xúc giác.

#### Visual Identity & Theme
- **Phong cách:** Modern High-Density Studio Workspace, tối giản tinh tế, lấy cảm hứng từ Figma, Linear và Raycast.
- **Bảng màu:**
  - *Canvas:* Nền dịu mắt Slate-50 / Slate-950 hỗ trợ đầy đủ Dark/Light mode chuẩn Tailwind v4 `@custom-variant dark`.
  - *Surfaces:* Thẻ đơn tầng tinh tế với viền mảnh `border-slate-200 dark:border-slate-800/80`, loại bỏ bóng đổ nặng nề.
  - *Accent:* Indigo/Emerald hiện đại (`#4F46E5` / `#10B981`) cho các tương tác trọng tâm.
- **Typography:** Display face `Plus Jakarta Sans` cho tiêu đề và thương hiệu; Body text rõ ràng, tinh gọn; Dữ liệu đo đạc khoa học hiển thị bằng `font-mono tabular-nums` (`JetBrains Mono`/`monospace`).

---

### 3. Key Product Decisions & Trade-Offs

- **Tự sinh mã ma trận QR phía Client (qr-code engine thuần JavaScript/TypeScript):**
  - *Lý do:* Đảm bảo tốc độ hiển thị tức thời $<15\text{ms}$ không phụ thuộc server hay API bên ngoài, bảo mật tối đa dữ liệu người dùng (dữ liệu WiFi, mật khẩu, vCard không bao giờ rời khỏi trình duyệt).
  - *Xử lý hình thái tùy biến:* Xây dựng bộ Canvas & SVG Path Renderer chuyên biệt vẽ từng module ma trận (hình tròn, bo góc thông minh, kim cương, vạch scan) và các Finder Patterns đặc thù theo đúng tiêu chuẩn ISO/IEC 18004.
- **Tính toán Reed-Solomon & Lớp chẩn đoán X-Ray:**
  - *Lý do:* Phục vụ đúng mục đích "nghiên cứu khoa học" của người dùng. Cho phép bóc tách trực quan vị trí các bit định vị, bit định dạng mặt nạ (Mask pattern) và dung lượng mã sửa sai.
- **Xử lý xuất vector SVG & raster PNG nét cao:**
  - Tạo cấu trúc vector SVG chuẩn mực với các thẻ `<path>`, `<circle>`, `<rect>` và `<defs>` chứa gradient. Tái tạo canvas ngoài màn hình (Offscreen Canvas) ở kích thước thực tế (lên tới 4000x4000px) khi tải file PNG để ảnh đạt độ sắc nét tuyệt đối cho in ấn.

---

### 4. Technical Architecture & Data Strategy

#### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│   [Logo: QRCode Studio] ── [Types/Presets/History] ── [Theme Toggle]   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌─────────────────────────────────┐   ┌──────────────────────────────────┐
│     Configurator Panel (Left)   │   │     Live Preview & Lab (Right)   │
│ ┌─────────────────────────────┐ │   │ ┌──────────────────────────────┐ │
│ │ 01. Content Type Switcher   │ │   │ │ High-Res Interactive Canvas  │ │
│ │  (URL/WiFi/vCard/SMS/...)   │ │   │ │ (Live Render / Zoom / Pan)   │ │
│ └─────────────────────────────┘ │   │ └──────────────────────────────┘ │
│ ┌─────────────────────────────┐ │   │ ┌──────────────────────────────┐ │
│ │ 02. Content Data Form       │ │   │ │ Scientific Matrix Inspector  │ │
│ │  (Dynamic inputs + validate)│ │   │ │  - Finder / Timing / Align   │ │
│ └─────────────────────────────┘ │   │ │  - Reed-Solomon ECC (L/M/Q/H)│ │
│ ┌─────────────────────────────┐ │   │ │  - In-Browser Scan Simulator │ │
│ │ 03. Colors & Gradients      │ │   │ └──────────────────────────────┘ │
│ │  (Solid/Linear/Radial/Eye)  │ │   │ ┌──────────────────────────────┐ │
│ └─────────────────────────────┘ │   │ │ Export & Resolution Bar      │ │
│ ┌─────────────────────────────┐ │   │ │  - Slider (500px - 4000px)   │ │
│ │ 04. Logo & Watermark Engine │ │   │ │  - [PNG] [SVG] [PDF] [Copy]  │ │
│ └─────────────────────────────┘ │   │ └──────────────────────────────┘ │
│ ┌─────────────────────────────┐ │   └──────────────────────────────────┘
│ │ 05. Custom Shapes & Eyes    │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 06. Curated Presets Library │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

#### State Architecture
- `qrConfig`: Đối tượng trạng thái tổng thể chứa `content`, `contentType`, `colors` (fg, bg, gradientType, gradientColors, eyeColorOuter, eyeColorInner), `design` (bodyShape, eyeFrameShape, eyeBallShape), `logo` (url, size, removeBg), `eccLevel` (L, M, Q, H).
- `matrixData`: Ma trận bit $N \times N$ được tính toán cùng bản đồ phân loại vùng (Functional Patterns vs. Data Codewords vs. ECC Codewords).
- `exportOptions`: Kích thước xuất pixel (`resolution`), định dạng file.
- `inspectorState`: Bật/tắt chế độ X-Ray giải phẫu, hiển thị tooltip thông tin khi trỏ chuột vào từng ô bit ma trận.
