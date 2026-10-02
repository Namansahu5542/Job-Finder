
export function ValidationAndTransformation(data) {
    const transformed = {
        ...data,
        email: data.email.trim().toLowerCase(),
        username: data.username.trim().toLowerCase(),
        profilename: data.profilename,
        password: data.password
    }
    const error = {};
    if (!transformed.email) {
        error("Email is Required")
    }

    if (!transformed.username) {
        error("User name is required")
    }
    if (!transformed.profilename) {
        error("Profile Name name is required")
    }
    if (!transformed.password) {
        error("Password is required")
    }

    if (!(transformed.email.email())) {
        error("Incorrect email")
    }
    if (!(transformed.username.string().min(12).max(30).regex(/^[a-zA-Z0-9_]+$/))) {
        error("Incorrect username")
    }
    if (!(transformed.password.min(8))) {
        error("Minimum 8 characters")
    }
    return {
        valid: Object.keys(error).length === 0,
        data: transformed,
        error,
    };

}