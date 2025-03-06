document.addEventListener("DOMContentLoaded", () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
    const formContainers = document.querySelectorAll(".form-container")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all tabs and forms
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        formContainers.forEach((form) => form.classList.remove("active"))
  
        // Add active class to clicked tab and corresponding form
        button.classList.add("active")
        const tabId = button.getAttribute("data-tab")
        document.getElementById(`${tabId}-form`).classList.add("active")
      })
    })
  
    // Form validation
    const registrationForm = document.getElementById("registrationForm")
    const contactForm = document.getElementById("contactForm")
  
    // Registration form validation
    if (registrationForm) {
      registrationForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const name = document.getElementById("reg-name")
        const username = document.getElementById("reg-username")
        const email = document.getElementById("reg-email")
        const phone = document.getElementById("reg-phone")
        const dob = document.getElementById("reg-dob")
        const address = document.getElementById("reg-address")
        const password = document.getElementById("reg-password")
        const confirmPassword = document.getElementById("reg-confirm-password")
  
        const nameError = document.getElementById("reg-name-error")
        const usernameError = document.getElementById("reg-username-error")
        const emailError = document.getElementById("reg-email-error")
        const phoneError = document.getElementById("reg-phone-error")
        const dobError = document.getElementById("reg-dob-error")
        const addressError = document.getElementById("reg-address-error")
        const passwordError = document.getElementById("reg-password-error")
        const confirmPasswordError = document.getElementById("reg-confirm-password-error")
  
        // Reset errors
        resetErrors(
          [name, username, email, phone, dob, address, password, confirmPassword],
          [nameError, usernameError, emailError, phoneError, dobError, addressError, passwordError, confirmPasswordError],
        )
  
        let isValid = true
  
        // Name validation
        if (!name.value.trim()) {
          showError(name, nameError, "Name is required")
          isValid = false
        } else if (name.value.trim().length < 2) {
          showError(name, nameError, "Name must be at least 2 characters")
          isValid = false
        }
  
        // Username validation
        if (!username.value.trim()) {
          showError(username, usernameError, "Username is required")
          isValid = false
        } else if (username.value.trim().length < 4) {
          showError(username, usernameError, "Username must be at least 4 characters")
          isValid = false
        } else if (!/^[a-zA-Z0-9_]+$/.test(username.value.trim())) {
          showError(username, usernameError, "Username can only contain letters, numbers, and underscores")
          isValid = false
        }
  
        // Email validation
        if (!email.value.trim()) {
          showError(email, emailError, "Email is required")
          isValid = false
        } else if (!isValidEmail(email.value)) {
          showError(email, emailError, "Please enter a valid email address")
          isValid = false
        }
  
        // Phone validation
        if (!phone.value.trim()) {
          showError(phone, phoneError, "Phone number is required")
          isValid = false
        } else if (!/^[\d\s\-$$$$]+$/.test(phone.value.trim())) {
          showError(phone, phoneError, "Please enter a valid phone number")
          isValid = false
        } else if (phone.value.replace(/[\s\-$$$$]/g, "").length < 10) {
          showError(phone, phoneError, "Phone number must have at least 10 digits")
          isValid = false
        }
  
        // Date of birth validation
        if (!dob.value) {
          showError(dob, dobError, "Date of birth is required")
          isValid = false
        } else {
          // Check if user is at least 18 years old
          const birthDate = new Date(dob.value)
          const today = new Date()
          let age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
  
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
          }
  
          if (age < 18) {
            showError(dob, dobError, "You must be at least 18 years old")
            isValid = false
          }
        }
  
        // Address validation
        if (!address.value.trim()) {
          showError(address, addressError, "Address is required")
          isValid = false
        } else if (address.value.trim().length < 10) {
          showError(address, addressError, "Please enter a complete address (at least 10 characters)")
          isValid = false
        }
  
        // Password validation
        if (!password.value) {
          showError(password, passwordError, "Password is required")
          isValid = false
        } else if (password.value.length < 8) {
          showError(password, passwordError, "Password must be at least 8 characters")
          isValid = false
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password.value)) {
          showError(password, passwordError, "Password must contain uppercase, lowercase, and number")
          isValid = false
        }
  
        // Confirm password validation
        if (!confirmPassword.value) {
          showError(confirmPassword, confirmPasswordError, "Please confirm your password")
          isValid = false
        } else if (password.value !== confirmPassword.value) {
          showError(confirmPassword, confirmPasswordError, "Passwords do not match")
          isValid = false
        }
  
        if (isValid) {
          // Show success message
          registrationForm.style.display = "none"
          document.getElementById("registration-success").classList.add("active")
          console.log("Registration form submitted successfully")
        }
      })
    }
  
    // Sign-in form validation
    const signinForm = document.getElementById("signinForm")
    if (signinForm) {
      signinForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const email = document.getElementById("signin-email")
        const password = document.getElementById("signin-password")
  
        const emailError = document.getElementById("signin-email-error")
        const passwordError = document.getElementById("signin-password-error")
  
        // Reset errors
        resetErrors([email, password], [emailError, passwordError])
  
        let isValid = true
  
        // Email validation
        if (!email.value.trim()) {
          showError(email, emailError, "Email is required")
          isValid = false
        } else if (!isValidEmail(email.value)) {
          showError(email, emailError, "Please enter a valid email address")
          isValid = false
        }
  
        // Password validation
        if (!password.value) {
          showError(password, passwordError, "Password is required")
          isValid = false
        }
  
        if (isValid) {
          // Show success message
          signinForm.style.display = "none"
          document.getElementById("signin-success").classList.add("active")
          console.log("Sign-in form submitted successfully")
        }
      })
    }
  
    // No need for character counter in sign-in form
  
    // Reset buttons
    const resetButtons = document.querySelectorAll(".reset-btn")
    resetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const formId = button.getAttribute("data-form")
        const form = document.getElementById(formId)
        const successMessage = button.parentElement
  
        // Reset form
        form.reset()
        form.style.display = "block"
        successMessage.classList.remove("active")
      })
    })
  
    // Helper functions
    function showError(input, errorElement, message) {
      input.classList.add("error")
      errorElement.textContent = message
    }
  
    function resetErrors(inputs, errorElements) {
      inputs.forEach((input) => input.classList.remove("error"))
      errorElements.forEach((error) => (error.textContent = ""))
    }
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  })
  
  