export interface Card {
    id: number;
    name: string;
    typeline: string[];
    type: Type;
    humanReadableCardType: string;
    frameType: FrameType;
    desc: string;
    race: string;
    atk: number;
    def: number;
    level: number;
    attribute: Attribute;
    archetype?: string;
    ygoprodeck_url: string;
    card_sets?: CardSet[];
    card_images: CardImage[];
    card_prices: CardPrice[];
    banlist_info?: BanlistInfo;
    pend_desc?: string;
    monster_desc?: string;
    scale?: number;
}

export enum Attribute {
    Water = "WATER",
}

export interface BanlistInfo {
    ban_tcg?: string;
    ban_ocg?: string;
    ban_goat?: string;
}

export interface CardImage {
    id: number;
    image_url: string;
    image_url_small: string;
    image_url_cropped: string;
}

export interface CardPrice {
    cardmarket_price: string;
    tcgplayer_price: string;
    ebay_price: string;
    amazon_price: string;
    coolstuffinc_price: string;
}

export interface CardSet {
    set_name: string;
    set_code: string;
    set_rarity: SetRarity;
    set_rarity_code: SetRarityCode;
    set_price: string;
}

export enum SetRarity {
    CollectorSRare = "Collector's Rare",
    Common = "Common",
    DuelTerminalNormalParallelRare = "Duel Terminal Normal Parallel Rare",
    DuelTerminalRareParallelRare = "Duel Terminal Rare Parallel Rare",
    DuelTerminalSuperParallelRare = "Duel Terminal Super Parallel Rare",
    DuelTerminalUltraParallelRare = "Duel Terminal Ultra Parallel Rare",
    EuropeanOceanianDebut = "European & Oceanian debut",
    GhostRare = "Ghost Rare",
    GoldRare = "Gold Rare",
    GoldSecretRare = "Gold Secret Rare",
    MosaicRare = "Mosaic Rare",
    New = "New",
    NormalParallelRare = "Normal Parallel Rare",
    PLatinumSecretRare = "PLatinum Secret Rare",
    PlatinumSecretRare = "Platinum Secret Rare",
    PrismaticSecretRare = "Prismatic Secret Rare",
    QuarterCenturySecretRare = "Quarter Century Secret Rare",
    Rare = "Rare",
    SecretRare = "Secret Rare",
    ShatterfoilRare = "Shatterfoil Rare",
    ShortPrint = "Short Print",
    StarfoilRare = "Starfoil Rare",
    StarlightRare = "Starlight Rare",
    SuperRare = "Super Rare",
    UltimateRare = "Ultimate Rare",
    UltraRare = "Ultra Rare",
}

export enum SetRarityCode {
    C = "(C)",
    CR = "(CR)",
    Dnpr = "(DNPR)",
    Drpr = "(DRPR)",
    Dspr = "(DSPR)",
    Dupr = "(DUPR)",
    Empty = "",
    GScR = "(GScR)",
    Gr = "(GR)",
    Gur = "(GUR)",
    Msr = "(MSR)",
    PS = "(PS)",
    PScR = "(PScR)",
    R = "(R)",
    SP = "(SP)",
    ScR = "(ScR)",
    Sfr = "(SFR)",
    Shr = "(SHR)",
    Sr = "(SR)",
    StR = "(StR)",
    Ur = "(UR)",
    UtR = "(UtR)",
}

export enum FrameType {
    Effect = "effect",
    EffectPendulum = "effect_pendulum",
    Fusion = "fusion",
    Normal = "normal",
    NormalPendulum = "normal_pendulum",
    Ritual = "ritual",
    Synchro = "synchro",
    Xyz = "xyz",
    XyzPendulum = "xyz_pendulum",
}

export enum Type {
    EffectMonster = "Effect Monster",
    FlipEffectMonster = "Flip Effect Monster",
    FusionMonster = "Fusion Monster",
    GeminiMonster = "Gemini Monster",
    NormalMonster = "Normal Monster",
    PendulumEffectMonster = "Pendulum Effect Monster",
    PendulumTunerEffectMonster = "Pendulum Tuner Effect Monster",
    RitualEffectMonster = "Ritual Effect Monster",
    SpiritMonster = "Spirit Monster",
    SynchroMonster = "Synchro Monster",
    SynchroTunerMonster = "Synchro Tuner Monster",
    ToonMonster = "Toon Monster",
    TunerMonster = "Tuner Monster",
    UnionEffectMonster = "Union Effect Monster",
    XYZMonster = "XYZ Monster",
    XYZPendulumEffectMonster = "XYZ Pendulum Effect Monster",
}
