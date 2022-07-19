import * as w4 from "./wasm4";

const smiley = memory.data<u8>([
    0b11000011,
    0b10000001,
    0b00100100,
    0b00100100,
    0b00100100,
    0b00100100,
    0b10111001,
    0b11000011,
]);

let x=0;

export function start(): void {
    store<u32>(w4.PALETTE, 0xfbf7f3, 0 * sizeof<u32>())
    store<u32>(w4.PALETTE, 0xe5b083, 1 * sizeof<u32>())
    store<u32>(w4.PALETTE, 0x426e5d, 2 * sizeof<u32>())
    store<u32>(w4.PALETTE, 0x20283d, 3 * sizeof<u32>())

    w4.tone(toneFrequency(200,400),
        toneDuration(10,10,10,10),
        toneVolume(100,100),
        toneFlags(2,2,0)
        );
}

export function update (): void {
    store<u16>(w4.DRAW_COLORS, 2);
    w4.text("Hello from\nAssemblyScript!", 10, 10);

    const gamepad = load<u8>(w4.GAMEPAD1);
    if (gamepad & w4.BUTTON_1) {
        store<u16>(w4.DRAW_COLORS, 3);
        w4.text("Ois Oi Oi", x, 90);
    }
    if (gamepad & w4.BUTTON_1) {
        x++;
    }

    w4.blit(smiley, 76, 76, 8, 8, w4.BLIT_1BPP);
    w4.text("Oi Oi Oi", 16, 90);
}


export function toneFrequency(freq1: i32 = 0, freq2: i32 = 0): u32 {
	return freq1 | (freq2 << 16);
}

export function toneDuration(attack: i32 = 0, decay: i32 = 0, sustain: i32 = 0, release: i32 = 0): u32 {
	return (attack << 24) | (decay << 16) | sustain | (release << 8);
}

export function toneVolume(peak: i32 = 0, volume: i32 = 0): u32 {
	return (peak << 8) | volume;
}

export function toneFlags(channel: i32 = 0, mode: i32 = 0, pan: i32 = 0): u32 {
	return channel | (mode << 2) | (pan << 4);
}