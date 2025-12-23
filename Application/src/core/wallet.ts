import { ethers } from 'ethers';

class WalletManager
{
    private WalletDerive: ethers.HDNodeWallet;
    private WalletAddress: string;

    /**
     * Constructor - Initializes a wallet manager from a mnemonic phrase
     * @param {string} Mnemonic - The BIP39 mnemonic phrase
     * @param {number} Index - The wallet derivation index path
     */
    constructor(Mnemonic: string, Index: number)
    {
        const Normalized = Mnemonic.normalize('NFKD');

        const Wallet = ethers.HDNodeWallet.fromPhrase(Normalized, '', `m/44'/60'/0'`);

        this.WalletDerive = Wallet.derivePath(`0/${ Index }`);
        this.WalletAddress = this.WalletDerive.address;
    }

    /**
     * Retrieve - Returns the public and private keys of the derived wallet
     * @returns {Object} Object containing Public and Private key strings
     */
    public Retrieve(): { Public: string; Private: string }
    {
        return { Public: this.WalletDerive.address, Private: this.WalletDerive.privateKey };
    }

    /**
     * Sign - Signs a message using the wallet's private key
     * @param {string | Uint8Array} Message - The message to sign
     * @returns {Promise<string>} The signature string
     */
    public async Sign(Message: string | Uint8Array<ArrayBufferLike>): Promise<string>
    {
        return await this.WalletDerive.signMessage(Message);
    }

    /**
     * Verify - Verifies that a signature was created by this wallet
     * @param {string} Message - The original message
     * @param {string} Signature - The signature to verify
     * @returns {boolean} True if signature is valid for this wallet, false otherwise
     */
    public Verify(Message: string, Signature: string): boolean
    {
        return ethers.verifyMessage(Message, Signature) === this.WalletAddress;
    }

    /**
     * ToString - Returns the wallet address as a string
     * @returns {string} The wallet address
     */
    public ToString(): string
    {
        return `${ this.WalletAddress }`;
    }

    /**
     * Generate - Generates a new random BIP39 mnemonic phrase
     * @returns {string} A new mnemonic phrase
     */
    public static Generate(): string
    {
        const Wallet = ethers.Wallet.createRandom();

        return Wallet.mnemonic!.phrase;
    }

    /**
     * Validate - Validates if a mnemonic phrase is valid BIP39
     * @param {string} Mnemonic - The mnemonic phrase to validate
     * @returns {boolean} True if the mnemonic is valid, false otherwise
     */
    public static Validate(Mnemonic: string): boolean
    {
        return ethers.Mnemonic.isValidMnemonic(Mnemonic);
    }

    /**
     * Verify - Recovers the wallet address from a signed message
     * @param {string} Message - The original message
     * @param {string} Signature - The signature
     * @returns {string} The recovered wallet address
     */
    public static Verify(Message: string, Signature: string): string
    {
        return ethers.verifyMessage(Message, Signature);
    }
}

export default WalletManager;
