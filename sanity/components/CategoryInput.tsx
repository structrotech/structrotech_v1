import React, { useEffect, useState, useCallback } from 'react'
import { type StringInputProps, set, unset, useClient } from 'sanity'

export function CategoryInput(props: StringInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const client = useClient({ apiVersion: '2024-01-01' })

  useEffect(() => {
    let isMounted = true
    client
      .fetch<string[]>(
        `array::unique(*[_type == "interestingTrick" && defined(category)].category)`
      )
      .then((results) => {
        if (!isMounted) return
        if (Array.isArray(results)) {
          const unique = results
            .filter((c): c is string => typeof c === 'string' && c.trim().length > 0)
            .sort((a, b) => a.localeCompare(b))
          setSuggestions(unique)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch existing trick categories:', err)
      })

    return () => {
      isMounted = false
    }
  }, [client])

  const handleSelect = useCallback(
    (cat: string) => {
      props.onChange(set(cat))
    },
    [props]
  )

  const datalistId = 'trick-categories-suggestions'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {props.renderDefault({
        ...props,
        elementProps: {
          ...props.elementProps,
          list: datalistId,
        } as any,
      })}
      <datalist id={datalistId}>
        {suggestions.map((cat) => (
          <option key={cat} value={cat} />
        ))}
      </datalist>

      {suggestions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#888', marginRight: '4px' }}>
            Previously used:
          </span>
          {suggestions.map((cat) => {
            const isSelected = props.value === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelect(cat)}
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  border: isSelected ? '1px solid #2276fc' : '1px solid #ccc',
                  background: isSelected ? '#2276fc' : 'transparent',
                  color: isSelected ? '#fff' : 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
