import app from './src/app';

const PORT: number = parseInt(process.env.PORT || '4000', 10);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}...`);
});
