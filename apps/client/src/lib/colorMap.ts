export const folderColors = ["gray", "blue", "sky", "red", "orange", "green", "teal", "purple"] as const

type colorType = Record<string, string>

export const colorMap: colorType = {
    gray: "#808080",
    blue: "#0000ff",
    sky: "#87ceeb",
    red: "#ff0000",
    orange: "#ffa500",
    green: "#008000",
    teal: "#008080",
    purple: "#800080",
}