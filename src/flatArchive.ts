export function pack(files: File[]): File|undefined {
    let chunks = [];
    let fileSizes = [];
    let fileNames = [];
    for (const file of files) {
        chunks.push(file);
        fileSizes.push(file.size);
        fileNames.push(file.name);
    }
    const meta = JSON.stringify({"sizes": fileSizes, "names": fileNames});
    if (meta.length > 65535) {
        console.log("archvie too big, tell jacob to fix flatArchive");
        return;
    }
    chunks.push(meta);
    chunks.push(new Uint16Array([meta.length]));//meta is a utf-16 string so it will take up twice as many bytes;
    return new File(chunks, "quiz.ocq");
}
export async function unpack(archive: File|Blob): Promise<File[]> {
    const buffer = await archive.arrayBuffer();
    const tableSize = new Uint16Array(buffer.slice(-2))[0];
    const table = JSON.parse(await archive.slice(archive.size - tableSize - 2, -2).text());
    
    let files = [];
    let acc = 0;
    for (let i = 0; i < table.sizes.length; i++) {
        files.push(new File([archive.slice(acc, acc + table.sizes[i])], table.names[i]));
        acc += table.sizes[i];
    }
    return files;
}