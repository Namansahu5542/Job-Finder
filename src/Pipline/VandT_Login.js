


export function ValidationAndTransformationLogin(data) {
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const password = typeof data.password === "string" ? data.password : "";
    const transform = {
        ...data,
        email,
        password,
    }
    const error = !email
        ? "Email required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? "Enter a valid email"
            : !password
                ? "Password required"
                : null;

    return {
        valid: error === null,
        data: transform,
        error,
    }
}