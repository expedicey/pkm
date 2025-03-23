// Mock data for the application

// Menu items
export const menuItems = [
  {
    id: "item-1",
    name: "Signature Burger",
    price: 35000,
    leadTime: 2,
    stock: 100,
  },
  {
    id: "item-2",
    name: "Crispy Chicken",
    price: 30000,
    leadTime: 1,
    stock: 150,
  },
  {
    id: "item-3",
    name: "Special Sauce (1L)",
    price: 25000,
    leadTime: 3,
    stock: 50,
  },
  {
    id: "item-4",
    name: "Burger Buns (Pack of 10)",
    price: 15000,
    leadTime: 2,
    stock: 80,
  },
  {
    id: "item-5",
    name: "Frozen Fries (1kg)",
    price: 40000,
    leadTime: 2,
    stock: 60,
  },
  {
    id: "item-6",
    name: "Soft Drink Syrup (5L)",
    price: 120000,
    leadTime: 4,
    stock: 30,
  },
]

// Branches
export const branches = [
  {
    id: "branch-1",
    name: "Jakarta Branch",
    location: "Jakarta",
    manager: "John Doe",
  },
  {
    id: "branch-2",
    name: "Tangerang Branch",
    location: "Tangerang",
    manager: "Jane Smith",
  },
  {
    id: "branch-3",
    name: "Bandung Branch",
    location: "Bandung",
    manager: "Bob Johnson",
  },
  {
    id: "branch-4",
    name: "Surabaya Branch",
    location: "Surabaya",
    manager: "Alice Williams",
  },
]

// Operators data
export const operators = [
  {
    id: "op-001",
    name: "Sarah Johnson",
    role: "Senior Operator",
    avatar: "/placeholder-user.jpg",
    dateJoined: "2024-01-15",
  },
  {
    id: "op-002",
    name: "David Chen",
    role: "Logistics Manager",
    avatar: "/placeholder-user.jpg",
    dateJoined: "2024-02-20",
  },
  {
    id: "op-003",
    name: "Maria Rodriguez",
    role: "Quality Control",
    avatar: "/placeholder-user.jpg",
    dateJoined: "2024-03-10",
  },
];

// Orders
export const orders = [
  {
    id: "order-1",
    branchId: "branch-1",
    branchName: "Jakarta Branch",
    orderDate: "2025-03-05T10:30:00",
    estimatedCompletion: "2025-03-07T14:00:00",
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    items: [
      {
        id: "item-1",
        name: "Signature Burger",
        quantity: 50,
        price: 35000,
      },
      {
        id: "item-3",
        name: "Special Sauce (1L)",
        quantity: 10,
        price: 25000,
      },
    ],
    total: 1750000 + 250000,
    approvedBy: {
      operatorId: "op-001",
      operatorName: "Sarah Johnson",
      timestamp: "2025-03-06T09:15:00",
      notes: "Priority order, processed ahead of schedule"
    },
    shippedBy: {
      operatorId: "op-002",
      operatorName: "David Chen",
      timestamp: "2025-03-07T08:30:00",
      notes: "Shipped via express delivery"
    }
  },
  {
    id: "order-2",
    branchId: "branch-2",
    branchName: "Tangerang Branch",
    orderDate: "2025-03-07T09:15:00",
    estimatedCompletion: "2025-03-09T11:00:00",
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "virtual_account",
    items: [
      {
        id: "item-2",
        name: "Crispy Chicken",
        quantity: 40,
        price: 30000,
      },
      {
        id: "item-5",
        name: "Frozen Fries (1kg)",
        quantity: 15,
        price: 40000,
      },
    ],
    total: 1200000 + 600000,
    approvedBy: {
      operatorId: "op-003",
      operatorName: "Maria Rodriguez",
      timestamp: "2025-03-07T14:20:00",
      notes: "Items confirmed available in inventory"
    }
  },
  {
    id: "order-3",
    branchId: "branch-3",
    branchName: "Bandung Branch",
    orderDate: "2025-03-08T14:45:00",
    estimatedCompletion: "2025-03-10T16:00:00",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "bank_transfer",
    items: [
      {
        id: "item-1",
        name: "Signature Burger",
        quantity: 30,
        price: 35000,
      },
      {
        id: "item-4",
        name: "Burger Buns (Pack of 10)",
        quantity: 20,
        price: 15000,
      },
      {
        id: "item-6",
        name: "Soft Drink Syrup (5L)",
        quantity: 5,
        price: 120000,
      },
    ],
    total: 1050000 + 300000 + 600000
  },
  {
    id: "order-4",
    branchId: "branch-4",
    branchName: "Surabaya Branch",
    orderDate: "2025-03-09T11:20:00",
    estimatedCompletion: "2025-03-11T13:00:00",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "credit",
    items: [
      {
        id: "item-2",
        name: "Crispy Chicken",
        quantity: 60,
        price: 30000,
      },
      {
        id: "item-3",
        name: "Special Sauce (1L)",
        quantity: 15,
        price: 25000,
      },
      {
        id: "item-5",
        name: "Frozen Fries (1kg)",
        quantity: 20,
        price: 40000,
      },
    ],
    total: 1800000 + 375000 + 800000
  },
  {
    id: "order-5",
    branchId: "branch-1",
    branchName: "Jakarta Branch",
    orderDate: "2025-03-10T08:00:00",
    estimatedCompletion: "2025-03-12T10:00:00",
    status: "pending",
    paymentStatus: "paid",
    paymentMethod: "bank_transfer",
    items: [
      {
        id: "item-6",
        name: "Soft Drink Syrup (5L)",
        quantity: 8,
        price: 120000,
      },
      {
        id: "item-4",
        name: "Burger Buns (Pack of 10)",
        quantity: 25,
        price: 15000,
      },
    ],
    total: 960000 + 375000
  },
]

// Payments
export const payments = [
  {
    id: "payment-1",
    orderId: "order-1",
    date: "2025-03-05T10:45:00",
    amount: 2000000,
    method: "Bank Transfer",
    status: "completed",
  },
  {
    id: "payment-2",
    orderId: "order-2",
    date: "2025-03-07T09:30:00",
    amount: 1800000,
    method: "Virtual Account",
    status: "completed",
  },
  {
    id: "payment-3",
    orderId: "order-5",
    date: "2025-03-10T08:15:00",
    amount: 1335000,
    method: "Bank Transfer",
    status: "completed",
  },
  {
    id: "payment-4",
    orderId: "order-3",
    date: "2025-03-08T15:00:00",
    amount: 1950000,
    method: "Bank Transfer",
    status: "pending",
  },
]

// Marketing Assets
export const marketingAssets = [
  {
    id: "asset-1",
    name: "Signature Burger Product Photo",
    description: "High-resolution photo of our signature burger for menu displays and social media",
    category: "product-photos",
    fileType: "image/jpeg",
    fileSize: "5.2 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-02-15T10:00:00",
  },
  {
    id: "asset-2",
    name: "Crispy Chicken Product Photo",
    description: "Professional photo of crispy chicken for promotional materials",
    category: "product-photos",
    fileType: "image/jpeg",
    fileSize: "4.8 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-02-15T10:00:00",
  },
  {
    id: "asset-3",
    name: "Monthly Promotion Poster - March",
    description: "Ready-to-print poster for March promotions featuring new menu items",
    category: "promotional",
    fileType: "application/pdf",
    fileSize: "8.5 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-03-01T09:30:00",
  },
  {
    id: "asset-4",
    name: "Social Media Campaign Kit",
    description: "Complete kit with images and copy for social media promotions",
    category: "promotional",
    fileType: "application/zip",
    fileSize: "15.2 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-02-28T14:15:00",
  },
  {
    id: "asset-5",
    name: "Brand Logo Pack",
    description: "Official brand logos in various formats and resolutions",
    category: "logos",
    fileType: "application/zip",
    fileSize: "12.7 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-01-10T11:20:00",
  },
  {
    id: "asset-6",
    name: "Brand Color Palette",
    description: "Official brand colors with hex codes and usage guidelines",
    category: "logos",
    fileType: "application/pdf",
    fileSize: "3.1 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-01-10T11:25:00",
  },
  {
    id: "asset-7",
    name: "Menu Template",
    description: "Editable menu template with brand styling",
    category: "templates",
    fileType: "application/pdf",
    fileSize: "5.4 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-02-05T09:45:00",
  },
  {
    id: "asset-8",
    name: "Email Newsletter Template",
    description: "HTML template for customer newsletters and promotions",
    category: "templates",
    fileType: "text/html",
    fileSize: "2.8 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-02-10T13:30:00",
  },
  {
    id: "asset-9",
    name: "Store Interior Photos",
    description: "High-quality photos of flagship store interior for reference",
    category: "product-photos",
    fileType: "image/jpeg",
    fileSize: "18.5 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-01-20T15:10:00",
  },
  {
    id: "asset-10",
    name: "Seasonal Promotion Guidelines",
    description: "Instructions for implementing seasonal promotions at your branch",
    category: "promotional",
    fileType: "application/pdf",
    fileSize: "4.2 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-03-05T10:15:00",
  },
  {
    id: "asset-11",
    name: "Brand Typography Guide",
    description: "Official fonts and typography guidelines for all marketing materials",
    category: "logos",
    fileType: "application/pdf",
    fileSize: "2.9 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-01-10T11:30:00",
  },
  {
    id: "asset-12",
    name: "Social Media Post Templates",
    description: "Editable templates for Instagram, Facebook, and Twitter posts",
    category: "templates",
    fileType: "application/zip",
    fileSize: "9.6 MB",
    thumbnail: "/placeholder.svg?height=300&width=400",
    dateAdded: "2025-02-15T14:20:00",
  },
]

