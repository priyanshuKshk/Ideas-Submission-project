export function login(user) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loginTime", Date.now());
}

export function logout() {
  localStorage.clear();
  window.location.href = "/";
}

export function isSessionExpired() {
  const time = localStorage.getItem("loginTime");
  if (!time) return true;
  const now = Date.now();
  const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
  return now - parseInt(time) > THREE_DAYS;
}

export function checkSession() {
  if (isSessionExpired()) {
    logout();
  }
}
