export async function readFile(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject('Error reading file');
    };

    reader.readAsDataURL(file);
  });
}

export function notNull<T>(el: T | null | undefined): el is T {
  return el != null;
}
