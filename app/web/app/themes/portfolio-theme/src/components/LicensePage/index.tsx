import clsx from 'clsx'
import { ReactNode, MutableRefObject, useEffect, useState, useRef } from 'react'
import Button from '../Button'
import styles from './styles.module.scss'
import { ReactComponent as CopyIcon } from 'line-awesome/svg/copy.svg'

interface LicensePageProps {
  uuid: string
  highestLicense?: number
  highestLicenseTitle?: string
  addedDomains: string[]
}

const copyToClipboard = (str: string) => navigator.clipboard.writeText(str)

const LicensePage = ({
  uuid,
  highestLicense,
  addedDomains: addedDomainsFromProps = [],
  highestLicenseTitle,
}: LicensePageProps) => {
  const [addedDomains, setAddedDomains] = useState(addedDomainsFromProps)

  const handleRemoveDomain = (domain: string) => async () => {
    const response = await fetch('/wp-json/licenseManager/v1/removeDomain', {
      method: 'POST',
      body: JSON.stringify({ domain }),
      headers: {
        'X-WP-Nonce': (window as any).wpApi.nonce,
        'Content-Type': 'application/json',
      },
    })
    const body = (await response.json()) as string[]
    setAddedDomains(body)
  }

  const noLicense = !highestLicense

  return (
    <div className={styles.domainsPage}>
      {noLicense ? (
        <>
          <h2>You don't have any active license yet</h2>
          <div className={styles.selectMsg}>
            <h4>Select one that fits you best</h4>
            <Button onClick={() => (window.location.href = '/pricing')}>
              Pricing
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2>License – {highestLicenseTitle}</h2>
          <div>
            <h5>Your license key</h5>
            <div className={styles.code}>
              <pre>{uuid}</pre>
              <button onClick={() => copyToClipboard(uuid)} title="Copy">
                <CopyIcon width="24" height="24" />
              </button>
            </div>
          </div>
          <div className={styles.domains}>
            <h2>Added domains</h2>
            {addedDomains.map((domain, key) => (
              <div className={styles.domain} key={key}>
                <Button onClick={handleRemoveDomain(domain)}>Remove</Button>
                <pre className="flex-grow" key={key}>
                  {domain}
                </pre>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

;(window as any).LicensePage = LicensePage

export default LicensePage
