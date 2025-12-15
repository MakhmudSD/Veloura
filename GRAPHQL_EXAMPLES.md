# GraphQL Playground Examples

## Access GraphQL Playground
1. Start your server: `npm run start:dev`
2. Open browser: `http://localhost:5000/graphql`
3. GraphQL Playground will open automatically

---

## 🔐 Authentication

### Original Login
```graphql
mutation Login {
  login(input: {
    memberNick: "testuser"
    memberPassword: "password123"
  }) {
    _id
    memberNick
    memberEmail
    accessToken
  }
}
```

### Signup
```graphql
mutation Signup {
  signup(input: {
    memberNick: "newuser"
    memberPhone: "1234567890"
    memberPassword: "password123"
    memberEmail: "user@example.com"
  }) {
    _id
    memberNick
    accessToken
  }
}
```

### OAuth Login (Google)
```graphql
mutation OAuthLoginGoogle {
  oauthLogin(input: {
    token: "YOUR_GOOGLE_ACCESS_TOKEN"
    provider: "google"
  }) {
    _id
    memberNick
    memberEmail
    memberImage
    accessToken
  }
}
```

### OAuth Login (Kakao)
```graphql
mutation OAuthLoginKakao {
  oauthLogin(input: {
    token: "YOUR_KAKAO_ACCESS_TOKEN"
    provider: "kakao"
  }) {
    _id
    memberNick
    memberEmail
    memberImage
    accessToken
  }
}
```

---

## 🛒 Cart

### Add to Cart
```graphql
mutation AddToCart {
  addToCart(input: {
    memberId: "user-uuid-here"
    productId: "product-uuid-here"
    quantity: 2
  }) {
    _id
    memberId
    productId
    quantity
    product {
      _id
      productName
      productPrice
      productImages
    }
    createdAt
  }
}
```

### Get Cart
```graphql
query GetCart {
  getCart(memberId: "user-uuid-here") {
    _id
    productId
    quantity
    product {
      _id
      productName
      productPrice
      productImages
      productQuantity
    }
  }
}
```

### Update Cart Item
```graphql
mutation UpdateCart {
  updateCart(input: {
    _id: "cart-item-uuid"
    quantity: 5
  }) {
    _id
    quantity
    updatedAt
  }
}
```

### Remove from Cart
```graphql
mutation RemoveFromCart {
  removeFromCart(id: "cart-item-uuid") {
    _id
    productId
  }
}
```

### Clear Cart
```graphql
mutation ClearCart {
  clearCart(memberId: "user-uuid-here")
}
```

---

## ❤️ Likes

### Toggle Like
```graphql
mutation ToggleLike {
  toggleLike(input: {
    memberId: "user-uuid-here"
    productId: "product-uuid-here"
  }) {
    liked
    like {
      _id
      memberId
      productId
      product {
        _id
        productName
        productPrice
      }
      createdAt
    }
  }
}
```

### Get User's Likes
```graphql
query GetLikes {
  getLikes(memberId: "user-uuid-here") {
    _id
    productId
    product {
      _id
      productName
      productPrice
      productImages
    }
    createdAt
  }
}
```

### Check if Liked
```graphql
query CheckLike {
  checkLike(
    memberId: "user-uuid-here"
    productId: "product-uuid-here"
  )
}
```

### Get Product Like Count
```graphql
query GetProductLikeCount {
  getProductLikeCount(productId: "product-uuid-here")
}
```

---

## 👁️ Views

### Track Product View
```graphql
mutation TrackView {
  trackView(input: {
    memberId: "user-uuid-here"
    viewRefId: "product-uuid-here"
    viewGroup: PRODUCT
  }) {
    _id
    memberId
    viewRefId
    viewGroup
    createdAt
  }
}
```

---

## 🏠 Homepage

### Get Top Products
```graphql
query GetTopProducts {
  getTopProducts(limit: 10) {
    _id
    productName
    productPrice
    productImages
    productViews
    productCategory
    createdAt
  }
}
```

### Get Popular Products
```graphql
query GetPopularProducts {
  getPopularProducts(limit: 10) {
    _id
    productName
    productPrice
    productImages
    productViews
    productCategory
    createdAt
  }
}
```

---

## 📦 Products

### Get Products with Filters
```graphql
query GetProducts {
  getProducts(input: {
    page: 1
    limit: 20
    order: "productViews"
    productCategory: LIQUIDS
    productGender: UNISEX
    search: "vitamin"
  }) {
    _id
    productName
    productPrice
    productCategory
    productTargetAudience
    productImages
    productViews
    productQuantity
  }
}
```

### Get Single Product
```graphql
query GetProduct {
  getProduct(id: "product-uuid-here") {
    _id
    productName
    productPrice
    productDesc
    productCategory
    productImages
    productViews
    productQuantity
    productTier
    productTargetAudience
  }
}
```

### Get All Products
```graphql
query GetAllProducts {
  getAllProducts {
    _id
    productName
    productPrice
    productCategory
    productImages
  }
}
```

---

## 📋 Orders

### Create Order
```graphql
mutation CreateOrder {
  createOrder(input: {
    orderTotal: 150.00
    orderDelivery: 10.00
    memberId: "user-uuid-here"
    orderStatus: PROCESS
  }) {
    _id
    orderTotal
    orderDelivery
    orderStatus
    memberId
    createdAt
  }
}
```

### Get My Orders
```graphql
query GetMyOrders {
  getOrders(memberId: "user-uuid-here") {
    _id
    orderTotal
    orderDelivery
    orderStatus
    createdAt
    orderItems {
      _id
      itemQuantity
      itemPrice
      productId
    }
  }
}
```

### Get Order Detail
```graphql
query GetOrder {
  getOrder(id: "order-uuid-here") {
    _id
    orderTotal
    orderDelivery
    orderStatus
    memberId
    orderItems {
      _id
      itemQuantity
      itemPrice
      productId
    }
    createdAt
  }
}
```

---

## 👤 User Profile

### Get Member Detail
```graphql
query GetMemberDetail {
  getMemberDetail(id: "user-uuid-here") {
    _id
    memberNick
    memberEmail
    memberPhone
    memberAddress
    memberImage
    memberPoints
    memberType
    memberStatus
  }
}
```

### Update Member
```graphql
mutation UpdateMember {
  updateMember(
    id: "user-uuid-here"
    input: {
      _id: "user-uuid-here"
      memberNick: "updatedname"
      memberPhone: "9876543210"
      memberEmail: "newemail@example.com"
      memberAddress: "New Address"
    }
  ) {
    _id
    memberNick
    memberEmail
    accessToken
  }
}
```

### Get Top Users
```graphql
query GetTopUsers {
  getTopUsers {
    _id
    memberNick
    memberImage
    memberPoints
  }
}
```

---

## 💬 Chatbot

### Chat with Bot
```graphql
query Chat {
  chat(
    message: "What vitamins do you recommend for immune support?"
    context: "User is looking for health supplements"
  )
}
```

---

## 🔔 Notifications

### Get Notices
```graphql
query GetNotices {
  getNotices(input: {
    page: 1
    limit: 10
    sort: "createdAt"
    direction: "DESC"
    search: {
      noticeStatus: ACTIVE
      text: "announcement"
    }
  }) {
    list {
      _id
      noticeTitle
      noticeContent
      noticeStatus
      memberId
      createdAt
    }
    metaCounter {
      total
    }
  }
}
```

### Get Single Notice
```graphql
query GetNotice {
  getNotice(id: "notice-uuid-here") {
    _id
    noticeTitle
    noticeContent
    noticeStatus
    createdAt
  }
}
```

---

## 📝 Tips

1. **Replace UUIDs**: Replace all `"user-uuid-here"`, `"product-uuid-here"` with actual IDs from your database
2. **Variables**: You can use GraphQL variables for cleaner queries:
```graphql
query GetProduct($id: String!) {
  getProduct(id: $id) {
    productName
    productPrice
  }
}
```
Then in Variables panel:
```json
{
  "id": "actual-product-uuid"
}
```

3. **Check Schema**: Click "Schema" tab in GraphQL Playground to see all available queries and mutations
4. **Auto-complete**: Use Ctrl+Space for auto-completion in GraphQL Playground

