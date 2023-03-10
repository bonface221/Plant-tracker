import jwtDecode from "jwt-decode";

const TokenService = (function tokenService() {
	let service;
	function getServiceFunc() {
		if (!service) {
			service = this;
			return service;
		}
		return service;
	}

	const setToken = (tokenObj) => {
		if (tokenObj.access) {
			localStorage.setItem("accessToken", tokenObj.access);
		}
		if (tokenObj.refresh) {
			localStorage.setItem("refreshToken", tokenObj.refresh);
		}
	};
	const getAccessToken = () => localStorage.getItem("accessToken");

	const getRefreshToken = () => localStorage.getItem("refreshToken");

	const getTokenValidity = (tokenObj) => {
		const decodedToken = jwtDecode(tokenObj);
		const dateNow = new Date();
		const timestamp = dateNow.getMinutes() / 1000;

		if (decodedToken.exp < timestamp) {
			return false;
		}
		return true;
	};

	const getAccessTokenValidity = () => {
		const accessToken = getAccessToken();
		if (accessToken) {
			return getTokenValidity(accessToken);
		}
		return null;
	};

	const getRefreshTokenValidity = () => {
		const refreshToken = getRefreshToken();
		if (refreshToken) {
			return getTokenValidity(refreshToken);
		}
		return null;
	};

	const clearToken = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	};

	return {
		getService: getServiceFunc,
		setToken,
		getAccessToken,
		getRefreshToken,
		getAccessTokenValidity,
		getRefreshTokenValidity,
		clearToken,
	};
})();

export default TokenService;
