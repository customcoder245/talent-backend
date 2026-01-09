import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import assessmentRoutes from "./routes/assessment.routes.js";
import questionRoutes from "./routes/question.routes.js";
import responseRoutes from "./routes/response.routes.js";

const app = express();

// Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  'http://localhost:5173',               
  'https://tbd-frontend-bice.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: Origin '${origin}' is not allowed`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow credentials
  })
);


// Ensure your server is handling preflight requests (OPTIONS)
app.options('*', cors());  // Handle preflight requests



// // Enable CORS
// app.use(
//   cors({
//     origin: 'https://tbd-frontend-bice.vercel.app/' 
//   })
// );

// Health check route
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working 🚀"
  });
});

// ROUTE MOUNTING
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/assessment", assessmentRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/responses", responseRoutes);

export { app };
