// Componente Footer - sempre visível na base da tela
export function Footer() {
  return (
    // Footer com sticky positioning via layout flexbox
    <footer className="w-full border-t border-gray-200 flex items-center justify-center bg-dark-gray-blue h-21 p-4 text-sm text-gray-500">
      {/* Texto de copyright com entidade HTML */}
      COPYRIGHT &copy; 2025 - SERRA JUNIOR ENGENHARIA
    </footer>
  );
}
