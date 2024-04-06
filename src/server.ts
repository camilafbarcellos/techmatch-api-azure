import app from './app';
import connectDB from './config/db';

const PORT: number = parseInt(process.env.PORT || '4000', 10);

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}...`);
  
  // Connect to MongoDB Atlas
  await connectDB();
});
