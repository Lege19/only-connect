export function bindKeys(forward: () => void, back: () => void) {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowLeft":
                back()
                break;
            case "ArrowRight":
            case " ":
                forward()
                break;
        }
    })
}