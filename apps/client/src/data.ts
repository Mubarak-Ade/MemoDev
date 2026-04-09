export const snippet = {
  title: "JWT Authentication Middleware",
  tags: ["auth", "backend", "security"],
  language: "javascript",
  code: `
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = decoded

  next()
}
`,
  explanation: `
# JWT Middleware

This middleware protects routes using JWT authentication.

## Usage

\`\`\`javascript
app.use(protect)
\`\`\`

## Flow

1. Read the authorization header
2. Verify the token
3. Attach user to request

## Notes

- Always store secrets in environment variables.
- Tokens should expire for security.
`
}