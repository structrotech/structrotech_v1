import { affiliateBoxBlock } from './affiliateBox'
import { sponsorBannerBlock } from './sponsorBanner'
import { downloadBoxBlock } from './downloadBox'
import { adSensePlaceholderBlock } from './adSensePlaceholder'

/**
 * In-body blocks an editor can insert anywhere in the article.
 * Document-level top/middle/bottom ad toggles remain on the `monetization` field.
 */
export const pageBuilderBlockSchemas = [
  affiliateBoxBlock,
  sponsorBannerBlock,
  downloadBoxBlock,
  adSensePlaceholderBlock,
]

/** References spread into a Portable Text array's `of` to allow inserting blocks anywhere. */
export const pageBuilderBlockRefs = pageBuilderBlockSchemas.map((block) => ({
  type: block.name,
}))
