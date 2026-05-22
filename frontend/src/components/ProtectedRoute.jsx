const token = localStorage.getItem("token");

if (!token) {
  return <Navigate to="/login" />;
}
