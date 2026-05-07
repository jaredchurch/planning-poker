const DOMAIN_KEY = 'jira_domain'
const EMAIL_KEY = 'jira_email'

export function getStoredDomain(): string {
  return localStorage.getItem(DOMAIN_KEY) || ''
}

export function getStoredEmail(): string {
  return localStorage.getItem(EMAIL_KEY) || ''
}

export function storeCredentials(domain: string, email: string): void {
  localStorage.setItem(DOMAIN_KEY, domain)
  localStorage.setItem(EMAIL_KEY, email)
}

export function clearCredentials(): void {
  localStorage.removeItem(DOMAIN_KEY)
  localStorage.removeItem(EMAIL_KEY)
}
