/**
 * Encripta un texto usando AES-GCM.
 */

const cryptoKey = import.meta.env.VITE_CRYPTO_KEY || "";

export async function encryptData(
  texto: string,
): Promise<{ data: string; iv: string }> {
  if (!cryptoKey) {
    throw new Error("La clave de cifrado no está configurada");
  }

  // Generar IV aleatorio
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Importar clave
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(cryptoKey),
    "AES-GCM",
    false,
    ["encrypt", "decrypt"],
  );

  // Encriptar
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(texto),
  );

  // Devolver como base64 + IV
  return {
    data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: Array.from(iv)
      .map((x) => String.fromCharCode(x))
      .join(""),
  };
}
