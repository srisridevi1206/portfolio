document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Add your form submission logic here
        // Example: Send to an API endpoint
        try {
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = 'Message Sent!';
            
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
            }, 3000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    });
});
