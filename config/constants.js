module.exports = {
    JWT_SECRET: 'supersecret',
    JWT_SESSION: { session: false },
    STATUS: {
        'SUCCESS': 0,
        'BAD_REQUEST': 1,
        'UNAUTHORIZED': 2,
        'INTERNAL_ERROR': 3
    },
    TOKEN_EXPIRE: '1h',
    TOKEN_HEADER: 'x-auth-token',
    HASH_TYPE: 'md5'
}