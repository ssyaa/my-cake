export function tambah(a, b) {
    return a + b;
}

export function kurang(a, b) {
    return a - b;
}

export function kali(a, b) {
    return a * b;
}

export function bagi(a, b) {
    if (b === 0) throw new Error("Tidak bisa bagi dengan nol");
    return a / b;
}
