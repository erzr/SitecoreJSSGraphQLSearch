// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon } from '@sitecore-jss/sitecore-jss-manifest';

export default function(manifest) {
  manifest.addComponent({
    name: 'SearchHeader',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText },
    ]
  });
}
