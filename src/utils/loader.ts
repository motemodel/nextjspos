export const imageLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
    return `http://localhost:4000/images/${src}?w=${width}&q=${quality || 75}`;
}