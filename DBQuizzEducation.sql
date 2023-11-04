USE [master]
GO
/****** Object:  Database [QuizzEducation]    Script Date: 10/10/2023 1:55:57 CH ******/
CREATE DATABASE [QuizzEducation]
GO
ALTER DATABASE [QuizzEducation] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QuizzEducation].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QuizzEducation] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QuizzEducation] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QuizzEducation] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QuizzEducation] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QuizzEducation] SET ARITHABORT OFF 
GO
ALTER DATABASE [QuizzEducation] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QuizzEducation] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QuizzEducation] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QuizzEducation] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QuizzEducation] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QuizzEducation] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QuizzEducation] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QuizzEducation] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QuizzEducation] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QuizzEducation] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QuizzEducation] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QuizzEducation] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QuizzEducation] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QuizzEducation] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QuizzEducation] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QuizzEducation] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QuizzEducation] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QuizzEducation] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [QuizzEducation] SET  MULTI_USER 
GO
ALTER DATABASE [QuizzEducation] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QuizzEducation] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QuizzEducation] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QuizzEducation] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [QuizzEducation] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [QuizzEducation] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'QuizzEducation', N'ON'
GO
ALTER DATABASE [QuizzEducation] SET QUERY_STORE = OFF
GO
USE [QuizzEducation]
GO
/****** Object:  Table [dbo].[BoCauHoiDaLam]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BoCauHoiDaLam](
	[ma_bo_cau_hoi_da_lam] [int] IDENTITY(1,1) NOT NULL,
	[ma_de_thi] [int] NOT NULL,
	[ten_dang_nhap] [varchar](50) NOT NULL,
	[diem_so] [float] NOT NULL,
	[thoi_gian_bat_dau] [datetime] NOT NULL,
	[thoi_gian_ket_thuc] [datetime] NOT NULL,
 CONSTRAINT [PK_BoCauHoiDaLam] PRIMARY KEY CLUSTERED 
(
	[ma_bo_cau_hoi_da_lam] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CauHoi]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CauHoi](
	[ma_cau_hoi] [int] IDENTITY(1,1) NOT NULL,
	[noi_dung_cau_hoi] [nvarchar](max) NOT NULL,
	[diem_cau_hoi] [float] NOT NULL,
	[nhieu_dap_an] [bit] NOT NULL,
	[ma_de_thi] [int] NOT NULL,
 CONSTRAINT [PK_CauHoi] PRIMARY KEY CLUSTERED 
(
	[ma_cau_hoi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChiTietKyThi]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietKyThi](
	[ma_chi_tiet_ky_thi] [int] IDENTITY(1,1) NOT NULL,
	[ma_ky_thi] [int] NOT NULL,
	[thoi_gian_bat_dau] [datetime] NULL,
	[thoi_gian_ket_thuc] [datetime] NULL,
	[ma_mon] [int] NOT NULL,
	[ma_lop] [int] NOT NULL,
 CONSTRAINT [PK_ChiTietKiThi] PRIMARY KEY CLUSTERED 
(
	[ma_chi_tiet_ky_thi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DapAn]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DapAn](
	[ma_dap_an] [int] IDENTITY(1,1) NOT NULL,
	[noi_dung_dap_an] [nvarchar](max) NOT NULL,
	[dap_an_dung] [bit] NOT NULL,
	[ma_cau_hoi] [int] NOT NULL,
	[diem_dap_an] [float] NOT NULL,
 CONSTRAINT [PK_DapAn] PRIMARY KEY CLUSTERED 
(
	[ma_dap_an] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DeThi]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeThi](
	[ma_de_thi] [int] IDENTITY(1,1) NOT NULL,
	[ten_de_thi] [nvarchar](MAX) NULL,
	[ten_dang_nhap] [varchar](50) NOT NULL,
	[ngay_tao] [datetime] NOT NULL,
	[ma_chi_tiet_ky_thi] [int] NOT NULL,
	[ma_mon] [int] NOT NULL,
	[da_su_dung] [bit] NOT NULL,
 CONSTRAINT [PK_DeThi] PRIMARY KEY CLUSTERED 
(
	[ma_de_thi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KyThi]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KyThi](
	[ma_ky_thi] [int] IDENTITY(1,1) NOT NULL,
	[ten_ky_thi] [nvarchar](200) NOT NULL,
	[ten_dang_nhap] [varchar](50) NOT NULL,
	[da_dien_ra] [bit] NOT NULL,
	[mo_ta] [nvarchar](max) NULL,
	[thoi_gian_bat_dau] [datetime] NULL,
	[thoi_gian_ket_thuc] [datetime] NULL,
 CONSTRAINT [PK_KiThi] PRIMARY KEY CLUSTERED 
(
	[ma_ky_thi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LichSuThi]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LichSuThi](
	[ma_lich_su_thi] [int] IDENTITY(1,1) NOT NULL,
	[ma_bo_cau_hoi_da_lam] [int] NOT NULL,
	[ma_dap_an_da_chon] [int] NOT NULL,
 CONSTRAINT [PK_LichSuThi] PRIMARY KEY CLUSTERED 
(
	[ma_lich_su_thi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LopThi]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LopThi](
	[ma_lop] [int] IDENTITY(1,1) NOT NULL,
	[ten_lop] [nvarchar](100) NOT NULL,
	[so_luong_toi_da] [int] NOT NULL,
 CONSTRAINT [PK_LopThi] PRIMARY KEY CLUSTERED 
(
	[ma_lop] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MonThi]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MonThi](
	[ma_mon] [int] IDENTITY(1,1) NOT NULL,
	[ten_mon] [nvarchar](50) NOT NULL,
	[thoi_gian_lam_bai] [int] NOT NULL,
 CONSTRAINT [PK_MonThi] PRIMARY KEY CLUSTERED 
(
	[ma_mon] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhanCong]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhanCong](
	[ma_phan_cong] [int] IDENTITY(1,1) NOT NULL,
	[ma_ky_thi] [int] NOT NULL,
	[ma_mon] [int] NOT NULL,
	[ten_dang_nhap] [varchar](50) NOT NULL,
	[da_tao_de] [bit] NOT NULL,
	[thoi_han] [datetime] NULL,
 CONSTRAINT [PK_PhanCong1] PRIMARY KEY CLUSTERED 
(
	[ma_phan_cong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[ten_dang_nhap] [varchar](50) NOT NULL,
	[mat_khau] [varchar](50) NOT NULL,
	[ma_vai_tro] [int] NOT NULL,
	[trang_thai] [bit] NOT NULL,
	[email] [varchar](50) NULL,
	[can_cuoc_cong_dan] [char](12) NULL,
	[ho_va_ten] [nvarchar](100) NULL,
	[gioi_tinh] [bit] NULL,
	[ngay_sinh] [date] NULL,
	[dia_chi] [nvarchar](max) NULL,
	[so_dien_thoai] [char](10) NULL,
	[ngay_tao_tai_khoan] [datetime] NOT NULL,
	[anh_dai_dien] [nvarchar](max) NULL,
	[ma_lop] [int] NULL,
 CONSTRAINT [PK_TaiKhoan] PRIMARY KEY CLUSTERED 
(
	[ten_dang_nhap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaiTro]    Script Date: 10/10/2023 1:55:57 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTro](
	[ma_vai_tro] [int] IDENTITY(1,1) NOT NULL,
	[ten_vai_tro] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_VaiTro] PRIMARY KEY CLUSTERED 
(
	[ma_vai_tro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ChiTietKyThi] ON 

INSERT [dbo].[ChiTietKyThi] ([ma_chi_tiet_ky_thi], [ma_ky_thi], [thoi_gian_bat_dau], [thoi_gian_ket_thuc], [ma_mon], [ma_lop]) VALUES (1, 11, NULL, NULL, 1, 1)
INSERT [dbo].[ChiTietKyThi] ([ma_chi_tiet_ky_thi], [ma_ky_thi], [thoi_gian_bat_dau], [thoi_gian_ket_thuc], [ma_mon], [ma_lop]) VALUES (2, 11, NULL, NULL, 1, 2)
INSERT [dbo].[ChiTietKyThi] ([ma_chi_tiet_ky_thi], [ma_ky_thi], [thoi_gian_bat_dau], [thoi_gian_ket_thuc], [ma_mon], [ma_lop]) VALUES (3, 11, NULL, NULL, 5, 1)
INSERT [dbo].[ChiTietKyThi] ([ma_chi_tiet_ky_thi], [ma_ky_thi], [thoi_gian_bat_dau], [thoi_gian_ket_thuc], [ma_mon], [ma_lop]) VALUES (4, 11, NULL, NULL, 5, 2)
SET IDENTITY_INSERT [dbo].[ChiTietKyThi] OFF
GO
SET IDENTITY_INSERT [dbo].[DeThi] ON 

INSERT [dbo].[DeThi] ([ma_de_thi], [ten_de_thi], [ten_dang_nhap], [ngay_tao], [ma_chi_tiet_ky_thi], [ma_mon], [da_su_dung]) VALUES (2,'Toán 10', N'BuiKhanhHuy', CAST(N'2023-10-08T00:00:00.000' AS DateTime), 1, 1, 0)
INSERT [dbo].[DeThi] ([ma_de_thi], [ten_de_thi], [ten_dang_nhap], [ngay_tao], [ma_chi_tiet_ky_thi], [ma_mon], [da_su_dung]) VALUES (6,'Sinh 11', N'BuiKhanhHuy', CAST(N'2023-10-08T00:00:00.000' AS DateTime), 1, 5, 0)
SET IDENTITY_INSERT [dbo].[DeThi] OFF
GO
SET IDENTITY_INSERT [dbo].[KyThi] ON 

INSERT [dbo].[KyThi] ([ma_ky_thi], [ten_ky_thi], [ten_dang_nhap], [da_dien_ra], [mo_ta], [thoi_gian_bat_dau], [thoi_gian_ket_thuc]) VALUES (7, N'Kỳ thi Toán Học Cấp Quốc Gia', N'AoNhatDuy', 1, N'', CAST(N'2023-01-08T00:00:00.000' AS DateTime), CAST(N'2023-01-18T00:00:00.000' AS DateTime))
INSERT [dbo].[KyThi] ([ma_ky_thi], [ten_ky_thi], [ten_dang_nhap], [da_dien_ra], [mo_ta], [thoi_gian_bat_dau], [thoi_gian_ket_thuc]) VALUES (8, N'Kỳ thi Tiếng Anh IELTS', N'AoNhatDuy', 1, N'', CAST(N'2023-02-08T00:00:00.000' AS DateTime), CAST(N'2023-02-18T00:00:00.000' AS DateTime))
INSERT [dbo].[KyThi] ([ma_ky_thi], [ten_ky_thi], [ten_dang_nhap], [da_dien_ra], [mo_ta], [thoi_gian_bat_dau], [thoi_gian_ket_thuc]) VALUES (9, N'Kỳ thi Lập Trình C++', N'AoNhatDuy', 1, N'', CAST(N'2023-03-08T00:00:00.000' AS DateTime), CAST(N'2023-03-18T00:00:00.000' AS DateTime))
INSERT [dbo].[KyThi] ([ma_ky_thi], [ten_ky_thi], [ten_dang_nhap], [da_dien_ra], [mo_ta], [thoi_gian_bat_dau], [thoi_gian_ket_thuc]) VALUES (10, N'Kỳ thi Văn Học Trung Quốc', N'AoNhatDuy', 1, N'', CAST(N'2023-04-08T00:00:00.000' AS DateTime), CAST(N'2023-04-18T00:00:00.000' AS DateTime))
INSERT [dbo].[KyThi] ([ma_ky_thi], [ten_ky_thi], [ten_dang_nhap], [da_dien_ra], [mo_ta], [thoi_gian_bat_dau], [thoi_gian_ket_thuc]) VALUES (11, N'Kỳ thi Sử Địa Việt Nam', N'AoNhatDuy', 0, N'', CAST(N'2023-10-08T00:00:00.000' AS DateTime), CAST(N'2023-10-18T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[KyThi] OFF
GO
SET IDENTITY_INSERT [dbo].[LopThi] ON 

INSERT [dbo].[LopThi] ([ma_lop], [ten_lop], [so_luong_toi_da]) VALUES (1, N'Lớp 8A1', 30)
INSERT [dbo].[LopThi] ([ma_lop], [ten_lop], [so_luong_toi_da]) VALUES (2, N'Lớp 8A2', 30)
SET IDENTITY_INSERT [dbo].[LopThi] OFF
GO
SET IDENTITY_INSERT [dbo].[MonThi] ON 

INSERT [dbo].[MonThi] ([ma_mon], [ten_mon], [thoi_gian_lam_bai]) VALUES (1, N'Lịch sử', 45)
INSERT [dbo].[MonThi] ([ma_mon], [ten_mon], [thoi_gian_lam_bai]) VALUES (2, N'Tiếng Anh', 60)
INSERT [dbo].[MonThi] ([ma_mon], [ten_mon], [thoi_gian_lam_bai]) VALUES (3, N'Toán', 90)
INSERT [dbo].[MonThi] ([ma_mon], [ten_mon], [thoi_gian_lam_bai]) VALUES (4, N'Ngữ Văn', 90)
INSERT [dbo].[MonThi] ([ma_mon], [ten_mon], [thoi_gian_lam_bai]) VALUES (5, N'Địa lý', 45)
SET IDENTITY_INSERT [dbo].[MonThi] OFF
GO
SET IDENTITY_INSERT [dbo].[PhanCong] ON 

INSERT [dbo].[PhanCong] ([ma_phan_cong], [ma_ky_thi], [ma_mon], [ten_dang_nhap], [da_tao_de], [thoi_han]) VALUES (1, 11, 1, N'BuiKhanhHuy', 0, NULL)
INSERT [dbo].[PhanCong] ([ma_phan_cong], [ma_ky_thi], [ma_mon], [ten_dang_nhap], [da_tao_de], [thoi_han]) VALUES (2, 11, 5, N'BuiKhanhHuy', 0, NULL)
SET IDENTITY_INSERT [dbo].[PhanCong] OFF
GO
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'AoNhatDuy', N'123', 3, 1, N'AoNhatDuy@gmail.com', N'231000111222', N'Ao Nhật Duy', 1, CAST(N'2008-12-05' AS Date), N'Cần Thơ', N'916666666 ', CAST(N'2023-10-08T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'BuiKhanhHuy', N'123', 2, 1, N'BuiKhanhHuy@gmail.com', N'231654987321', N'Bùi Khánh Huy', 0, CAST(N'2000-08-18' AS Date), N'Cần Thơ', N'947777777 ', CAST(N'2023-09-25T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'ChauManhTan', N'123', 1, 1, N'ChauManhTan@gmail.com', N'231888444555', N'Châu Mạnh Tấn', 1, CAST(N'2001-02-16' AS Date), N'Cần Thơ', N'917777777 ', CAST(N'2023-09-30T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'ChiemQuocVinh', N'123', 1, 1, N'ChiemQuocVinh@gmail.com', N'231123123123', N'Chiêm Quốc Vinh', 1, CAST(N'2006-11-30' AS Date), N'Cần Thơ', N'945555555 ', CAST(N'2023-10-05T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'DamVietThang', N'123', 1, 1, N'DamVietThang@gmail.com', N'231222777888', N'Đàm Việt Thắng', 1, CAST(N'2002-05-12' AS Date), N'Cần Thơ', N'908888888 ', CAST(N'2023-10-01T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'DauHongThinh', N'123', 1, 1, N'DauHongThinh@gmail.com', N'231333666444', N'Đầu Hồng Thịnh', 0, CAST(N'2001-08-17' AS Date), N'Cần Thơ', N'972222222 ', CAST(N'2023-10-03T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'DoanHaiPhong', N'123', 1, 1, N'DoanHaiPhong@gmail.com', N'231555111222', N'Doãn Hải Phong', 1, CAST(N'2007-10-21' AS Date), N'Cần Thơ', N'986666666 ', CAST(N'2023-09-29T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'HaHungThinh', N'123', 1, 1, N'HaHungThinh@gmail.com', N'231666999555', N'Hà Hùng Thịnh', 1, CAST(N'2000-08-03' AS Date), N'Cần Thơ', N'963333333 ', CAST(N'2023-10-04T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'HeDinhThien', N'123', 1, 1, N'HeDinhThien@gmail.com', N'231999555111', N'Hề Ðình Thiện', 0, CAST(N'2006-06-06' AS Date), N'Cần Thơ', N'939999999 ', CAST(N'2023-10-02T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'KhaDinhDuong', N'123', 1, 1, N'KhaDinhDuong@gmail.com', N'231789789789', N'Kha Ðình Dương', 0, CAST(N'2009-09-03' AS Date), N'Cần Thơ', N'983333333 ', CAST(N'2023-10-07T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'KhaiChiKhang', N'123', 1, 1, N'KhaiChiKhang@gmail.com', N'231456789123', N'Khai Chí Khang', 1, CAST(N'2000-09-01' AS Date), N'Cần Thơ', N'978888888 ', CAST(N'2023-09-22T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'LeTuDong', N'123', 1, 1, N'LeTuDong@gmail.com', N'231123456789', N'Lê Từ Ðông', 0, CAST(N'2004-02-13' AS Date), N'Cần Thơ', N'987654321 ', CAST(N'2023-09-20T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'LuyenThienHung', N'123', 1, 1, N'LuyenThienHung@gmail.com', N'231321654987', N'Luyện Thiên Hưng', 1, CAST(N'2006-10-01' AS Date), N'Cần Thơ', N'965555555 ', CAST(N'2023-09-24T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'ThanhTrungNhan', N'123', 1, 1, N'ThanhTrungNhan@gmail.com', N'231777888999', N'Thành Trung Nhân', 1, CAST(N'2007-08-29' AS Date), N'Cần Thơ', N'954444444 ', CAST(N'2023-09-28T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'ThapTheDung', N'123', 1, 1, N'ThapTheDung@gmail.com', N'231987654321', N'Thập Thế Dũng', 0, CAST(N'2005-06-21' AS Date), N'Cần Thơ', N'912345678 ', CAST(N'2023-09-21T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'ThucChiGiang', N'123', 1, 1, N'ThucChiGiang@gmail.com', N'231999888777', N'Thục Chí Giang', 1, CAST(N'2004-10-20' AS Date), N'Cần Thơ', N'909999999 ', CAST(N'2023-10-09T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'ToDinhDieu', N'123', 1, 1, N'ToDinhDieu@gmail.com', N'231456456456', N'Tô Ðình Diệu', 0, CAST(N'2008-11-14' AS Date), N'Cần Thơ', N'926666666 ', CAST(N'2023-10-06T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'TonHuyKhanh', N'123', 1, 1, N'TonHuyKhanh@gmail.com', N'231789123456', N'Tôn Huy Khánh', 0, CAST(N'2002-07-25' AS Date), N'Cần Thơ', N'901234567 ', CAST(N'2023-09-23T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'VanGiangNam', N'123', 1, 1, N'VanGiangNam@gmail.com', N'231111222333', N'Văn Giang Nam', 1, CAST(N'2001-10-06' AS Date), N'Cần Thơ', N'931111111 ', CAST(N'2023-09-26T00:00:00.000' AS DateTime), N'', NULL)
INSERT [dbo].[TaiKhoan] ([ten_dang_nhap], [mat_khau], [ma_vai_tro], [trang_thai], [email], [can_cuoc_cong_dan], [ho_va_ten], [gioi_tinh], [ngay_sinh], [dia_chi], [so_dien_thoai], [ngay_tao_tai_khoan], [anh_dai_dien], [ma_lop]) VALUES (N'VoHoNam', N'123', 1, 1, N'VoHoNam@gmail.com', N'231444555666', N'Võ Hồ Nam', 0, CAST(N'2001-08-28' AS Date), N'Cần Thơ', N'923333333 ', CAST(N'2023-09-27T00:00:00.000' AS DateTime), N'', NULL)
GO
SET IDENTITY_INSERT [dbo].[VaiTro] ON 

INSERT [dbo].[VaiTro] ([ma_vai_tro], [ten_vai_tro]) VALUES (1, N'Học sinh')
INSERT [dbo].[VaiTro] ([ma_vai_tro], [ten_vai_tro]) VALUES (2, N'Giáo viên')
INSERT [dbo].[VaiTro] ([ma_vai_tro], [ten_vai_tro]) VALUES (3, N'Admin')
SET IDENTITY_INSERT [dbo].[VaiTro] OFF
GO
ALTER TABLE [dbo].[BoCauHoiDaLam]  WITH CHECK ADD  CONSTRAINT [FK_BoCauHoiDaLam_DeThi] FOREIGN KEY([ma_de_thi])
REFERENCES [dbo].[DeThi] ([ma_de_thi])
GO
ALTER TABLE [dbo].[BoCauHoiDaLam] CHECK CONSTRAINT [FK_BoCauHoiDaLam_DeThi]
GO
ALTER TABLE [dbo].[BoCauHoiDaLam]  WITH CHECK ADD  CONSTRAINT [FK_BoCauHoiDaLam_TaiKhoan] FOREIGN KEY([ten_dang_nhap])
REFERENCES [dbo].[TaiKhoan] ([ten_dang_nhap])
GO
ALTER TABLE [dbo].[BoCauHoiDaLam] CHECK CONSTRAINT [FK_BoCauHoiDaLam_TaiKhoan]
GO
ALTER TABLE [dbo].[CauHoi]  WITH CHECK ADD  CONSTRAINT [FK_CauHoi_DeThi] FOREIGN KEY([ma_de_thi])
REFERENCES [dbo].[DeThi] ([ma_de_thi])
GO
ALTER TABLE [dbo].[CauHoi] CHECK CONSTRAINT [FK_CauHoi_DeThi]
GO
ALTER TABLE [dbo].[ChiTietKyThi]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietKiThi_KiThi] FOREIGN KEY([ma_ky_thi])
REFERENCES [dbo].[KyThi] ([ma_ky_thi])
GO
ALTER TABLE [dbo].[ChiTietKyThi] CHECK CONSTRAINT [FK_ChiTietKiThi_KiThi]
GO
ALTER TABLE [dbo].[ChiTietKyThi]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietKiThi_LopThi] FOREIGN KEY([ma_lop])
REFERENCES [dbo].[LopThi] ([ma_lop])
GO
ALTER TABLE [dbo].[ChiTietKyThi] CHECK CONSTRAINT [FK_ChiTietKiThi_LopThi]
GO
ALTER TABLE [dbo].[ChiTietKyThi]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietKiThi_MonThi] FOREIGN KEY([ma_mon])
REFERENCES [dbo].[MonThi] ([ma_mon])
GO
ALTER TABLE [dbo].[ChiTietKyThi] CHECK CONSTRAINT [FK_ChiTietKiThi_MonThi]
GO
ALTER TABLE [dbo].[DapAn]  WITH CHECK ADD  CONSTRAINT [FK_DapAn_CauHoi] FOREIGN KEY([ma_cau_hoi])
REFERENCES [dbo].[CauHoi] ([ma_cau_hoi])
GO
ALTER TABLE [dbo].[DapAn] CHECK CONSTRAINT [FK_DapAn_CauHoi]
GO
ALTER TABLE [dbo].[DeThi]  WITH CHECK ADD  CONSTRAINT [FK_DeThi_ChiTietKyThi] FOREIGN KEY([ma_chi_tiet_ky_thi])
REFERENCES [dbo].[ChiTietKyThi] ([ma_chi_tiet_ky_thi])
GO
ALTER TABLE [dbo].[DeThi] CHECK CONSTRAINT [FK_DeThi_ChiTietKyThi]
GO
ALTER TABLE [dbo].[DeThi]  WITH CHECK ADD  CONSTRAINT [FK_DeThi_MonThi] FOREIGN KEY([ma_mon])
REFERENCES [dbo].[MonThi] ([ma_mon])
GO
ALTER TABLE [dbo].[DeThi] CHECK CONSTRAINT [FK_DeThi_MonThi]
GO
ALTER TABLE [dbo].[KyThi]  WITH CHECK ADD  CONSTRAINT [FK_KiThi_TaiKhoan] FOREIGN KEY([ten_dang_nhap])
REFERENCES [dbo].[TaiKhoan] ([ten_dang_nhap])
GO
ALTER TABLE [dbo].[KyThi] CHECK CONSTRAINT [FK_KiThi_TaiKhoan]
GO
ALTER TABLE [dbo].[LichSuThi]  WITH CHECK ADD  CONSTRAINT [FK_LichSuThi_BoCauHoiDaLam] FOREIGN KEY([ma_bo_cau_hoi_da_lam])
REFERENCES [dbo].[BoCauHoiDaLam] ([ma_bo_cau_hoi_da_lam])
GO
ALTER TABLE [dbo].[LichSuThi] CHECK CONSTRAINT [FK_LichSuThi_BoCauHoiDaLam]
GO
ALTER TABLE [dbo].[LichSuThi]  WITH CHECK ADD  CONSTRAINT [FK_LichSuThi_DapAn] FOREIGN KEY([ma_dap_an_da_chon])
REFERENCES [dbo].[DapAn] ([ma_dap_an])
GO
ALTER TABLE [dbo].[LichSuThi] CHECK CONSTRAINT [FK_LichSuThi_DapAn]
GO
ALTER TABLE [dbo].[PhanCong]  WITH CHECK ADD  CONSTRAINT [FK_PhanCong_KiThi] FOREIGN KEY([ma_ky_thi])
REFERENCES [dbo].[KyThi] ([ma_ky_thi])
GO
ALTER TABLE [dbo].[PhanCong] CHECK CONSTRAINT [FK_PhanCong_KiThi]
GO
ALTER TABLE [dbo].[PhanCong]  WITH CHECK ADD  CONSTRAINT [FK_PhanCong_MonThi] FOREIGN KEY([ma_mon])
REFERENCES [dbo].[MonThi] ([ma_mon])
GO
ALTER TABLE [dbo].[PhanCong] CHECK CONSTRAINT [FK_PhanCong_MonThi]
GO
ALTER TABLE [dbo].[PhanCong]  WITH CHECK ADD  CONSTRAINT [FK_PhanCong_TaiKhoan] FOREIGN KEY([ten_dang_nhap])
REFERENCES [dbo].[TaiKhoan] ([ten_dang_nhap])
GO
ALTER TABLE [dbo].[PhanCong] CHECK CONSTRAINT [FK_PhanCong_TaiKhoan]
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_TaiKhoan_LopThi] FOREIGN KEY([ma_lop])
REFERENCES [dbo].[LopThi] ([ma_lop])
GO
ALTER TABLE [dbo].[TaiKhoan] CHECK CONSTRAINT [FK_TaiKhoan_LopThi]
GO
ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_TaiKhoan_VaiTro] FOREIGN KEY([ma_vai_tro])
REFERENCES [dbo].[VaiTro] ([ma_vai_tro])
GO
ALTER TABLE [dbo].[TaiKhoan] CHECK CONSTRAINT [FK_TaiKhoan_VaiTro]
GO
USE [master]
GO
ALTER DATABASE [QuizzEducation] SET  READ_WRITE 
GO
