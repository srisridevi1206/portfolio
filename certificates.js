document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.certificate-modal');
    const modalImg = document.getElementById('modal-certificate');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-certificate');

    // Certificate paths
    const certificatePaths = {
        cert1: 'assets/certificates/web-development.jpg',
        cert2: 'assets/certificates/python.jpg',
        cert3: 'assets/certificates/react.jpg',
        cert4: 'assets/certificates/aws.jpg',
        cert5: 'assets/certificates/cybersecurity.jpg',
        cert6: 'assets/certificates/machine-learning.jpg'
    };

    // Open modal
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const certId = e.target.dataset.certificate;
            modalImg.src = certificatePaths[certId];
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
