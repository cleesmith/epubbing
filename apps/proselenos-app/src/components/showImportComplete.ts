import Swal from 'sweetalert2';

export async function showImportComplete(isDarkMode = true) {
  const result = await Swal.fire({
    title: 'Import complete',
    icon: 'success',
    html: '<div style="display:grid;gap:1rem;line-height:1.5">' +
      '<p style="margin:0">Your backup has been restored.</p>' +
      '<p style="margin:0">Choose OK to refresh the page and see your restored data.</p></div>',
    background: isDarkMode ? '#222' : '#fff',
    color: isDarkMode ? '#fff' : '#333',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK',
    showConfirmButton: true,
    showCancelButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: { container: 'swal-above-modal' },
    didOpen: () => {
      const container = Swal.getContainer();
      if (container) container.style.zIndex = '10200';
    },
  });
  if (result.isConfirmed) window.location.reload();
}
