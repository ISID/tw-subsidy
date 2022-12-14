/* eslint-disable unused-imports/no-unused-vars */
import { AccountState } from 'algosdk';

export class JSONRequest<Data = Record<string, any>, Body = Data | Uint8Array> {
  constructor();

  path(): string;
  prepare(body: Body): Data;
  do(headers?: Record<string, any>): Promise<Data>;
  setIntDecoding(method: IntDecoding): this;
}

export class AccountInformation extends JSONRequest<AccountState> {
  private account;
  constructor(c: any, intDecoding: IntDecoding, account: string);
  path(): string;
  exclude(exclude: string): this;
}

export default class GetAssetByID extends JSONRequest {
  private index;
  constructor(c: HTTPClient, intDecoding: IntDecoding, index: number);
  path(): string;
}

declare module 'algosdk' {
  export class Algod {
    constructor(
      token: string,
      baseServer: string,
      port: number,
      headers?: object
    );

    status(): Promise<NodeStatus>;
  }

  export class Algodv2 {
    constructor(
      token: string,
      baseServer: string,
      port?: number,
      headers?: object
    );

    compile(source: string): Action<CompileOut>;
    status(): Action<any>;

    sendRawTransaction(rawSignedTxn: TxnBytes | TxnBytes[]): Action<TxResult>;
    getTransactionParams(): Action<SuggestedParams>;
    pendingTransactionInformation(txId: string): Action<ConfirmedTxResult>;
    statusAfterBlock(lastround: number): Action<any>;
    accountInformation(address: string): JSONRequest<AccountState>;
    setIntEncoding(method: string): void;
    getIntEncoding(): string;
    getAssetByID(index: number): JSONRequest<{
      params: {
        name: string;
        'unit-name': string;
        url: string;
        decimals: number;
      };
    }>;
  }

  export const OnApplicationComplete: {
    ClearStateOC: number;
    CloseOutOC: number;
    DeleteApplicationOC: number;
    NoOpOC: number;
    OptInOC: number;
    UpdateApplicationOC: number;
  };

  export namespace modelsv2 {
    function Account(...args: any[]): void;

    function Application(...args: any[]): void;

    function ApplicationLocalState(...args: any[]): void;

    function ApplicationParams(...args: any[]): void;

    function ApplicationStateSchema(...args: any[]): void;

    function Asset(...args: any[]): void;

    function AssetHolding(...args: any[]): void;

    function AssetDef(...args: any[]): void;

    function DryrunRequest(...args: any[]): void;

    function DryrunSource(...args: any[]): void;

    function TealKeyValue(...args: any[]): void;

    function TealValue(...args: any[]): void;
  }

  export class Kmd {
    constructor(token: string, baseServer: string, port: number);

    versions(): Promise<any>;

    listWallets(): Promise<Wallets>;

    initWalletHandle(walletid: string, password: string): Promise<WalletHandle>;

    listKeys(wallet_handle_token: string): Promise<Keys>;

    exportMasterDerivationKey(
      walletHandle: string,
      walletPassword: string
    ): Promise<{
      master_derivation_key: Buffer;
    }>;

    exportKey(
      wallet_handle_token: string,
      password: string,
      address: string
    ): Promise<{
      private_key: Uint8Array;
    }>;

    createWallet(
      walletName: string,
      walletPassword: string,
      walletMDK?: Uint8Array,
      walletDriverName?: string
    ): Promise<{
      wallet: WalletDetails;
    }>;

    generateKey(walletHandle: string): Promise<{
      address: string;
    }>;
  }

  export interface Wallets {
    wallets: WalletDetails[];
  }

  export interface WalletDetails {
    driver_name: string;
    driver_version: number;
    id: string;
    mnemonic_ux: boolean;
    name: string;
    supported_txs: string[];
  }

  export interface Keys {
    addresses: string[];
  }

  export interface WalletHandle {
    wallet_handle_token: string;
  }

  export interface Account {
    addr: string;
    sk: Uint8Array;
  }

  export interface CompileOut {
    hash: string;
    result: string;
  }

  // https://github.com/algorand/js-algorand-sdk/blob/develop/src/transaction.js
  export interface Transaction {
    // fields copied from
    // https://github.com/algorand/js-algorand-sdk/blob/develop/src/transaction.js#L117
    from: Address;
    to: Address;
    fee: number;
    amount: number | bigint;
    firstRound: number;
    lastRound: number;
    note: Uint8Array;
    genesisID: string;
    genesisHash: Buffer;
    lease: Uint8Array;

    closeRemainderTo: Address;
    voteKey: Buffer;
    selectionKey: Buffer;
    voteFirst: any;
    voteLast: any;
    voteKeyDilution: any;

    assetIndex: number;
    assetTotal: number | bigint;
    assetDecimals: number;
    assetDefaultFrozen: any;
    assetManager: Address;
    assetReserve: Address;

    assetFreeze: Address;
    assetClawback: Address;
    assetUnitName: string;
    assetName: string;
    assetURL: string;
    assetMetadataHash: Buffer;

    freezeAccount: Address;
    freezeState: any;
    assetRevocationTarget: any;

    appIndex: number;
    appOnComplete: number;
    appLocalInts: number;
    appLocalByteSlices: number;
    appGlobalInts: number;
    appGlobalByteSlices: number;

    appApprovalProgram: Uint8Array;
    appClearProgram: Uint8Array;
    appArgs: Uint8Array[];
    appAccounts: Address[];
    appForeignApps: number[];
    appForeignAssets: number[];
    type: string;
    reKeyTo: Address;
    group: Buffer;

    addLease: (lease: Uint8Array | undefined, feePerByte?: number) => void;
    addRekey: (reKeyTo: string, feePerByte?: number) => void;
    bytesToSign: () => Uint8Array;
    signTxn: (sk: Uint8Array) => TxnBytes;
    toByte: () => Uint8Array;
    txID: () => string;

    from_obj_for_encoding: (txnForEnc: unknown) => Transaction;
    get_obj_for_encoding: () => unknown;
  }

  // an object created by `Transaction.signTxn` before serializing
  export interface SignedTransaction {
    txn: Transaction;
    sig: Uint8Array;
  }

  // args Program arguments as array of Uint8Array arrays
  export type LogicSigArgs = Uint8Array[];

  export interface Subsig {
    pk: Uint8Array;
    s: Uint8Array;
  }

  export interface MultiSig {
    subsig: Subsig[];
    thr: number;
    v: number;
  }

  export interface MultiSigAccount {
    version: number;
    threshold: number;
    // array of base32 encoded addresses
    addrs: string[];
  }

  // Stateful Smart Contract Schema
  export interface SSCStateSchema {
    key: Uint8Array;
    value: {
      type: number;
      bytes: Uint8Array;
      uint: number | bigint;
    };
  }

  // total byte slices and uint for account or unique appId
  export interface SSCSchemaConfig {
    'num-byte-slice': number;
    'num-uint': number;
  }

  export class LogicSigBase {
    tag: Buffer | Uint8Array;
    logic: Uint8Array;
    // args Program arguments as array of Uint8Array arrays
    args: LogicSigArgs;
    sig?: Uint8Array;
    msig?: MultiSig;
  }

  export class LogicSig extends LogicSigBase {
    constructor(program: Uint8Array, args: LogicSigArgs);

    get_obj_for_encoding(): LogicSigBase;
    from_obj_for_encoding(encoded: LogicSigBase): LogicSig;

    // Performs signature verification
    verify(msg: Uint8Array): boolean;
    // Compute hash of the logic sig program (that is the same as escrow account address) as string address
    address(): string;
    // Creates signature (if no msig provided) or multi signature otherwise
    sign(secretKey?: Uint8Array, msig?: MultiSigAccount): void;
    // Signs and appends a signature
    appendToMultisig(secretKey: Uint8Array): void;
    // signs and returns program signature, without appending it to this object
    signProgram(secretKey: Uint8Array): Uint8Array;
    singleSignMultisig(
      secretKey: Uint8Array,
      msig: MultiSig
    ): [Uint8Array, number];
    // serializes and encodes the LogicSig
    toByte(): Uint8Array;
    // deserializes a LogicSig which was serialized using toByte()
    fromByte(encoded: Uint8Array): LogicSig;
  }

  export interface TxSig {
    txID: string;
    // blob representing signed transaction data (it's `txn.get_obj_for_encoding()`)
    blob: Uint8Array;
  }

  export function Indexer(...args: any[]): any;

  export function algosToMicroalgos(algos: any): any;

  export function appendSignMultisigTransaction(
    multisigTxnBlob: Uint8Array,
    account: MultiSigAccount,
    sk: Uint8Array
  ): any;

  export function assignGroupID(txns: any, from?: any): any;

  export function computeGroupID(txns: any): any;

  export function decodeObj(o: any): any;

  export function encodeObj(o: any): any;

  export function generateAccount(): Account;

  /**
   * isValidAddress takes an Algorand address and checks if valid.
   * @param address Algorand address
   * @returns true if valid, false otherwise
   */
  export function isValidAddress(addr: string): boolean;

  /**
   * decodeAddress takes an Algorand address in string form and decodes it into a Uint8Array(as public key).
   * @param address an Algorand address with checksum.
   * @returns the decoded form of the address's public key and checksum
   */
  export function decodeAddress(a: string): Address;

  /**
   * encodeAddress takes an Algorand address as a Uint8Array and encodes it into a string with checksum.
   * @param address a raw Algorand address
   * @returns the address and checksum encoded as a string.
   */
  export function encodeAddress(a: Uint8Array): string;

  /**
   * encodeUint64 converts an integer to its binary representation.
   * @param num - The number to convert. This must be an unsigned integer less than
   *   2^64.
   * @returns An 8-byte typed array containing the big-endian encoding of the input
   *   integer.
   */
  export declare function encodeUint64(num: number | bigint): Uint8Array;
  /**
   * decodeUint64 produces an integer from a binary representation.
   * @param data - An typed array containing the big-endian encoding of an unsigned integer
   *   less than 2^64. This array must be at most 8 bytes long.
   * @param decodingMode - Configure how the integer will be
   *   decoded.
   *
   *   The options are:
   *   * "safe": The integer will be decoded as a Number, but if it is greater than
   *     Number.MAX_SAFE_INTEGER an error will be thrown.
   *   * "mixed": The integer will be decoded as a Number if it is less than or equal to
   *     Number.MAX_SAFE_INTEGER, otherwise it will be decoded as a BigInt.
   *   * "bigint": The integer will always be decoded as a BigInt.
   *
   *   Defaults to "safe" if not included.
   * @returns The integer that was encoded in the input data. The return type will
   *   be determined by the parameter decodingMode.
   */
  export declare function decodeUint64(data: Uint8Array): number;
  export declare function decodeUint64(
    data: Uint8Array,
    decodingMode: 'safe'
  ): number;
  export declare function decodeUint64(
    data: Uint8Array,
    decodingMode: 'mixed'
  ): number | bigint;
  export declare function decodeUint64(
    data: Uint8Array,
    decodingMode: 'bigint'
  ): bigint;

  /**
   * multisigAddress takes multisig metadata (preimage) and returns the corresponding human readable Algorand address.
   * @param version mutlisig version
   * @param threshold multisig threshold
   * @param addresses array of encoded addresses
   */
  export function multisigAddress(account: MultiSigAccount): string;

  // Calls LogicSig.fromByte
  export function logicSigFromByte(encoded: Uint8Array): LogicSig;

  /**
   * tealSign creates a signature compatible with ed25519verify opcode from contract address
   * @param sk - uint8array with secret key
   * @param data - buffer with data to sign
   * @param contractAddress string representation of teal contract address (program hash)
   */
  export function tealSign(
    sk: Uint8Array,
    data: Uint8Array,
    contractAddress: string
  ): Uint8Array;

  /**
   * tealSignFromProgram creates a signature compatible with ed25519verify opcode from raw program bytes
   * @param sk - uint8array with secret key
   * @param data - buffer with data to sign
   * @param program - buffer with teal program
   */
  export function tealSignFromProgram(
    sk: Uint8Array,
    data: Uint8Array,
    program: Uint8Array
  ): Uint8Array;

  /**
   * encodeUnsignedTransaction takes a completed Transaction object, such as from the makeFoo
   * family of transactions, and converts it to a Buffer
   * @param t the completed Transaction object
   * @returns Uint8Array
   */
  export function encodeUnsignedTransaction(t: Transaction): Uint8Array;

  /**
   * decodeUnsignedTransaction takes a Buffer (as if from encodeUnsignedTransaction) and converts it to a Transaction object
   * @param b the Uint8Array containing a transaction
   * @returns Transaction
   */
  export function decodeUnsignedTransaction(b: Uint8Array): Transaction;

  /**
   * decodeSignedTransaction takes a Buffer (from transaction.signTxn) and converts it to an object
   * containing the Transaction (txn), the signature (sig), and the auth-addr field if applicable (sgnr)
   * @param b the Uint8Array containing a transaction
   * @returns Object containing a Transaction, the signature, and possibly an auth-addr field
   */
  export function decodeSignedTransaction(b: Uint8Array): SignedTransaction;

  export function makeApplicationClearStateTxn(
    from: string,
    suggestedParams: SuggestedParams,
    appIndex: number,
    appArgs?: Uint8Array[],
    accounts?: string[],
    foreignApps?: any,
    foreignAssets?: any,
    note?: Uint8Array,
    lease?: Uint8Array,
    rekeyTo?: string
  ): any;

  export function makeApplicationCloseOutTxn(
    from: string,
    suggestedParams: SuggestedParams,
    appIndex: number,
    appArgs?: Uint8Array[],
    accounts?: string[],
    foreignApps?: number[],
    foreignAssets?: number[],
    note?: Uint8Array,
    lease?: Uint8Array,
    rekeyTo?: string
  ): any;

  export function makeApplicationCreateTxn(
    from: string,
    suggestedParams: SuggestedParams,
    onComplete: number,
    approvalProgram: any,
    clearProgram: any,
    numLocalInts: any,
    numLocalByteSlices: any,
    numGlobalInts: any,
    numGlobalByteSlices: any,
    appArgs?: Uint8Array[],
    accounts?: string[],
    foreignApps?: number[],
    foreignAssets?: number[],
    note?: Uint8Array,
    lease?: Uint8Array,
    rekeyTo?: string
  ): any;

  export function makeApplicationDeleteTxn(
    from: string,
    suggestedParams: SuggestedParams,
    appIndex: number,
    appArgs?: Uint8Array[],
    accounts?: string[],
    foreignApps?: number[],
    foreignAssets?: number[],
    note?: Uint8Array,
    lease?: Uint8Array,
    rekeyTo?: string
  ): any;

  export function makeApplicationNoOpTxn(
    from: string,
    suggestedParams: SuggestedParams,
    appIndex: number,
    appArgs?: Uint8Array[],
    accounts?: string[],
    foreignApps?: number[],
    foreignAssets?: number[],
    note?: Uint8Array,
    lease?: Uint8Array,
    rekeyTo?: string
  ): any;

  export function makeApplicationOptInTxn(
    from: string,
    suggestedParams: SuggestedParams,
    appIndex: number,
    appArgs?: Uint8Array[],
    accounts?: string[],
    foreignApps?: number[],
    foreignAssets?: number[],
    note?: Uint8Array,
    lease?: Uint8Array,
    rekeyTo?: string
  ): any;

  export function makeApplicationUpdateTxn(
    from: string,
    suggestedParams: SuggestedParams,
    appIndex: number,
    approvalProgram: any,
    clearProgram: any,
    appArgs?: Uint8Array[],
    accounts?: string[],
    foreignApps?: number[],
    foreignAssets?: number[],
    note?: Uint8Array,
    lease?: Uint8Array,
    rekeyTo?: string
  ): any;

  export function makeAssetConfigTxn(
    from: string,
    fee: string,
    firstRound: number,
    lastRound: number,
    note?: Uint8Array,
    genesisHash: string,
    genesisID: string,
    assetIndex: number,
    manager: string,
    reserve: string,
    freeze: string,
    clawback: string,
    strictEmptyAddressChecking?: boolean
  ): Transaction;

  export function makeAssetConfigTxnWithSuggestedParams(
    from: string,
    note?: Uint8Array,
    assetIndex: number,
    manager?: string,
    reserve?: string,
    freeze?: string,
    clawback?: string,
    suggestedParams: SuggestedParams,
    strictEmptyAddressChecking?: boolean
  ): Transaction;

  export function makeAssetConfigTxnWithSuggestedParamsFromObject(o: {
    from: string;
    note?: Uint8Array;
    assetIndex: number;
    manager?: string;
    reserve?: string;
    freeze?: string;
    clawback?: string;
    suggestedParams: SuggestedParams;
    strictEmptyAddressChecking?: boolean;
  }): Transaction;

  export function makeAssetCreateTxn(
    from: string,
    fee: number,
    firstRound: number,
    lastRound: number,
    note?: Uint8Array,
    genesisHash: string,
    genesisID: string,
    total: number,
    decimals: number,
    defaultFrozen: boolean,
    manager?: string,
    reserve?: string,
    freeze?: string,
    clawback?: string,
    unitName: string,
    assetName: string,
    assetURL: string,
    assetMetadataHash?: string | Uint8Array
  ): Transaction;

  export function makeAssetCreateTxnWithSuggestedParams(
    from: string,
    note?: Uint8Array,
    total: number,
    decimals: number,
    defaultFrozen: boolean,
    manager?: string,
    reserve?: string,
    freeze?: string,
    clawback?: string,
    unitName: string,
    assetName: string,
    assetURL: string,
    assetMetadataHash?: string | Uint8Array,
    suggestedParams: SuggestedParams
  ): Transaction;

  export function makeAssetCreateTxnWithSuggestedParamsFromObject(o: {
    from: string;
    note?: Uint8Array;
    total: number;
    decimals: number;
    defaultFrozen: boolean;
    manager?: string;
    reserve?: string;
    freeze?: string;
    clawback?: string;
    unitName: string;
    assetName: string;
    assetURL: string;
    assetMetadataHash?: string | Uint8Array;
    suggestedParams: SuggestedParams;
  }): Transaction;

  export function makeAssetDestroyTxn(
    from: string,
    fee: number,
    firstRound?: number,
    lastRound?: number,
    note?: any,
    genesisHash: string,
    genesisID: string,
    assetIndex: number
  ): Transaction;

  export function makeAssetDestroyTxnWithSuggestedParams(
    from: string,
    note?: Uint8Array,
    assetIndex: number,
    suggestedParams: SuggestedParams
  ): Transaction;

  export function makeAssetDestroyTxnWithSuggestedParamsFromObject(o: {
    from: string;
    note?: Uint8Array;
    assetIndex: number;
    suggestedParams: SuggestedParams;
  }): Transaction;

  export function makeAssetFreezeTxn(
    from: string,
    fee: number,
    firstRound: number,
    lastRound: number,
    note?: Uint8Array,
    genesisHash: string,
    genesisID: string,
    assetIndex: number,
    freezeTarget: string,
    freezeState: boolean
  ): Transaction;

  export function makeAssetFreezeTxnWithSuggestedParams(
    from: string,
    note?: Uint8Array,
    assetIndex: number,
    freezeTarget: string,
    freezeState: boolean,
    suggestedParams: SuggestedParams
  ): Transaction;

  export function makeAssetFreezeTxnWithSuggestedParamsFromObject(o: {
    from: string;
    note?: Uint8Array;
    assetIndex: number;
    freezeTarget: string;
    freezeState: boolean;
    suggestedParams: SuggestedParams;
  }): Transaction;

  export function makeAssetTransferTxn(
    from: string,
    to: string,
    closeRemainderTo?: string,
    revocationTarget?: string,
    fee: number,
    amount: number,
    firstRound?: number,
    lastRound?: number,
    note?: Uint8Array,
    genesisHash: string,
    genesisID: string,
    assetIndex: number
  ): Transaction;

  export function makeAssetTransferTxnWithSuggestedParams(
    from: string,
    to: string,
    closeRemainderTo?: string,
    revocationTarget?: string,
    amount: number,
    note?: Uint8Array,
    assetIndex: number,
    suggestedParams: SuggestedParams
  ): Transaction;

  export function makeAssetTransferTxnWithSuggestedParamsFromObject(o: {
    from: string;
    to: string;
    closeRemainderTo?: string;
    revocationTarget?: string;
    amount: number;
    note?: Uint8Array;
    assetIndex: number;
    suggestedParams: SuggestedParams;
  }): Transaction;

  export function makeKeyRegistrationTxn(
    from: string,
    fee: number,
    firstRound?: number,
    lastRound?: number,
    note?: any,
    genesisHash: string,
    genesisID: string,
    voteKey: any,
    selectionKey: any,
    voteFirst: any,
    voteLast: any,
    voteKeyDilution: any
  ): Transaction;

  export function makeKeyRegistrationTxnWithSuggestedParams(
    from: string,
    note?: any,
    voteKey: any,
    selectionKey: any,
    voteFirst: any,
    voteLast: any,
    voteKeyDilution: any,
    suggestedParams: SuggestedParams
  ): Transaction;

  export function makeLogicSig(
    program: Uint8Array,
    args: LogicSigArgs
  ): LogicSig;

  export function makePaymentTxn(
    from: string,
    to: string,
    fee: number,
    amount: number | bigint,
    closeRemainderTo?: string,
    firstRound: number,
    lastRound: any,
    note: any,
    genesisHash: any,
    genesisID: any,
    rekeyTo?: string
  ): Transaction;

  export function makePaymentTxnWithSuggestedParams(
    from: string,
    to: string,
    amount: number | bigint,
    closeRemainderTo?: string,
    note?: Uint8Array,
    suggestedParams: SuggestedParams,
    rekeyTo?: string
  ): Transaction;

  export function makePaymentTxnWithSuggestedParamsFromObject(o: {
    from: string;
    to: string;
    amount: number | bigint;
    closeRemainderTo?: string;
    note?: Uint8Array;
    suggestedParams: SuggestedParams;
    rekeyTo?: string;
  }): Transaction;

  export function masterDerivationKeyToMnemonic(mdk: Buffer): string;

  /**
   * mergeMultisigTransactions takes a list of multisig transaction blobs, and merges them.
   * @param multisigTxnBlobs a list of blobs representing encoded multisig txns
   * @returns typed array msg-pack encoded multisig txn
   */
  export function mergeMultisigTransactions(
    multisigTxnBlobs: Uint8Array[]
  ): Uint8Array;

  export function microalgosToAlgos(microalgos: any): any;

  export function mnemonicToMasterDerivationKey(mn: string): Buffer;

  export function mnemonicToSecretKey(mn: string): Account;

  export function secretKeyToMnemonic(sk: Uint8Array): string;

  export function signBid(bid: any, sk: any): any;

  /**
   * signBytes takes arbitrary bytes and a secret key, prepends the bytes with "MX" for domain separation, signs the bytes
   * with the private key, and returns the signature.
   * @param bytes arbitrary bytes
   * @param sk Algorand secret key
   * @returns binary signature
   */
  export function signBytes(bytes: Uint8Array, sk: Uint8Array): Uint8Array;

  /**
   * signLogicSigTransaction takes  a raw transaction and a LogicSig object and returns a logicsig
   * transaction which is a blob representing a transaction and logicsig object.
   * @param Object dictionary containing constructor arguments for a transaction
   * @param lsig logicsig object
   * @returns TxSig - Object containing txID and blob representing signed transaction.
   * @throws error on failure
   */
  export function signLogicSigTransaction(txn: any, lsig: LogicSig): TxSig;

  /**
   * signLogicSigTransactionObject takes transaction.Transaction and a LogicSig object and returns a logicsig
   * transaction which is a blob representing a transaction and logicsig object.
   * @param txn transaction.Transaction
   * @param lsig logicsig object
   * @returns TxSig - Object containing txID and blob representing signed transaction.
   */
  export function signLogicSigTransactionObject(
    txn: Transaction,
    lsig: LogicSig
  ): TxSig;

  export function signMultisigTransaction(
    txn: Transaction,
    account: MultiSigAccount,
    sk: Uint8Array
  ): { blob: Uint8Array };

  export function signTransaction(txn: Transaction, sk: Uint8Array): any;

  /**
   * verifyBytes takes array of bytes, an address, and a signature and verifies if the signature is correct for the public
   * key and the bytes (the bytes should have been signed with "MX" prepended for domain separation).
   * @param bytes arbitrary bytes
   * @param signature binary signature
   * @param addr string address
   * @returns bool
   */
  export function verifyBytes(
    bytes: Uint8Array,
    signature: Uint8Array,
    addr: string
  ): boolean;

  export function waitForConfirmation(
    client: Algodv2,
    txId: string,
    waitRounds: number
  ): Promise<ConfirmedTxResult>;

  export namespace ERROR_INVALID_MICROALGOS {
    const message: string;
    const name: string;
    const stack: string;

    function toString(): any;
  }

  export namespace ERROR_MULTISIG_BAD_SENDER {
    const message: string;
    const name: string;
    const stack: string;

    function toString(): any;
  }

  // *************************
  //     Support types

  export class Action<T> {
    do(headers?: Record<string, unknown>): Promise<T>;
  }

  export interface RequestError extends Error {
    response?: {
      statusCode: number;
      text: string;
      body: {
        message: string;
      };
      error?: Error;
    };
    error?: Error;
  }

  export interface NodeStatus {
    catchpoint: string;
    'catchpoint-acquired-blocks': number;
    'catchpoint-processed-accounts': number;
    'catchpoint-total-accounts': number;
    'catchpoint-total-blocks': number;
    'catchup-time': number;
    'last-catchpoint': string;
    'last-round': number;
    'last-version': string;
    'next-version': string;
    'next-version-round': number;
    'next-version-supported': boolean;
    'stopped-at-unsupported-round': boolean;
    'time-since-last-round': number;
  }

  export interface TxResult {
    txId: string;
  }

  export interface ConfirmedTxResult {
    'confirmed-round': number;
    'asset-index': number;
    'application-index': number;
    'global-state-delta': string;
    'local-state-delta': string;
  }

  export interface SuggestedParams {
    flatFee: boolean;
    fee: number;
    firstRound: number;
    lastRound: number;
    genesisID: string;
    genesisHash: string;
  }

  export interface ParsedAddress {
    publicKey: string;
  }

  export interface Address {
    publicKey: Uint8Array;
    checksum: Uint8Array;
  }

  export type TxnBytes = Uint8Array;

  export interface SSCAttributes {
    'approval-program': string;
    'clear-state-program': string;
    creator: string;
    'global-state': SSCStateSchema[];
    'global-state-schema': SSCSchemaConfig;
    'local-state-schema': SSCSchemaConfig;
  }

  export interface AssetDef {
    creator: string;
    total: number | bigint;
    decimals: number;
    'default-frozen': boolean;
    'unit-name': string;
    name: string;
    url: string;
    'metadata-hash': string;
    manager: string;
    reserve: string;
    freeze: string;
    clawback: string;
  }

  export interface AssetHolding {
    amount: number | bigint;
    'asset-id': number;
    creator: string;
    frozen: boolean;
  }

  export interface CreatedApp {
    id: number;
    params: SSCAttributes;
  }

  export interface CreatedAsset {
    index: number;
    params: AssetDef;
  }

  export interface AppLocalState {
    id: number;
    'key-value': SSCStateSchema[];
    schema: SSCSchemaConfig;
  }

  export interface AccountState {
    address: string;
    assets: AssetHolding[];
    amount: number | bigint;
    'amount-without-pending-rewards': number;
    'pending-rewards': number;
    'reward-base': number;
    rewards: number;
    round: number;
    status: string;
    'apps-local-state': AppLocalState[];
    'apps-total-schema': SSCSchemaConfig;
    'created-apps': CreatedApp[];
    'created-assets': CreatedAsset[];
  }

  export interface TxnEncodedObj {
    // common fields
    // https://developer.algorand.org/docs/reference/transactions/#common-fields-header-and-type
    fee: number;
    fv: number;
    lv: number;
    note: Buffer;
    snd: Buffer;
    type: string;
    gen: string;
    gh: Buffer;
    rekey: Buffer;
    lx: Buffer;
    grp: Buffer;

    // Payment Transaction
    // https://developer.algorand.org/docs/reference/transactions/#payment-transaction
    rcv: Buffer;
    amt: number | bigint;
    close: Buffer;

    // Key Registration Transaction
    // https://developer.algorand.org/docs/reference/transactions/#key-registration-transaction
    votekey: Buffer;
    selkey: Buffer;
    votefst: number;
    votelst: number;
    votekd: number;

    // Asset Configuration Transaction
    // https://developer.algorand.org/docs/reference/transactions/#asset-configuration-transaction
    caid: number;
    apar: AssetDefEnc;

    // Asset Transfer Transaction
    // https://developer.algorand.org/docs/reference/transactions/#asset-transfer-transaction
    xaid: number;
    aamt: number | bigint;
    asnd: Buffer;
    arcv: Buffer;
    aclose: Buffer;

    // Asset Freeze Transaction
    // https://developer.algorand.org/docs/reference/transactions/#asset-freeze-transaction
    fadd: Buffer;
    faid: number;
    afrz: boolean;

    // Application Call Transaction
    // https://developer.algorand.org/docs/reference/transactions/#application-call-transaction
    apid: number;
    apan: TxnOnComplete;
    apat: Buffer[];
    apap: Buffer;
    apaa: Buffer[];
    apsu: Buffer;
    apfa: number[];
    apas: number[];
    apls: StateSchemaEnc;
    apgs: StateSchemaEnc;
  }

  // https://developer.algorand.org/docs/reference/teal/specification/#oncomplete
  enum TxnOnComplete {
    NoOp,
    OptIn,
    CloseOut,
    ClearState,
    UpdateApplication,
    DeleteApplication,
  }

  // https://developer.algorand.org/docs/reference/transactions/#asset-parameters
  export interface AssetDefEnc {
    t: number | bigint;
    dc: number;
    df: number;
    un: string;
    an: string;
    au: string;
    am: Buffer;
    m: Buffer;
    r: Buffer;
    f: Buffer;
    c: Buffer;
  }

  // https://developer.algorand.org/docs/reference/transactions/#storage-state-schema
  export interface StateSchemaEnc {
    nui: number;
    nbs: number;
  }

  export enum IntDecoding {
    /**
     * All integers will be decoded as Numbers, meaning any values greater than
     * Number.MAX_SAFE_INTEGER will lose precision.
     */
    DEFAULT = 'default',
    /**
     * All integers will be decoded as Numbers, but if any values are greater than
     * Number.MAX_SAFE_INTEGER an error will be thrown.
     */
    SAFE = 'safe',
    /**
     * Integers will be decoded as Numbers if they are less than or equal to
     * Number.MAX_SAFE_INTEGER, otherwise they will be decoded as BigInts.
     */
    MIXED = 'mixed',
    /**
     * All integers will be decoded as BigInts.
     */
    BIGINT = 'bigint',
  }
}
