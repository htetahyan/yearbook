import * as crypto from 'crypto';
const secretKey = '33f7b26a514de636088b310b16d346d43513bc377da9d0c24a2a7be5067c4005';
export function encryptPayload(payload: any) {
    // Generate a 16-byte (128-bit) key

 
    // Generate a random initialization vector
    const iv = crypto.randomBytes(16);

    try {
        // Create a cipher using AES-256-CBC
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);

        // Encrypt the payload
        let encrypted = cipher.update(JSON.stringify(payload));
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        // Return the IV and encrypted data
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    } catch (error) {
        console.error('Encryption failed:', error);
        throw error; // Rethrow the error if needed
    }
}


export function decryptPayload(encryptedData: string, iv: string) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
}
