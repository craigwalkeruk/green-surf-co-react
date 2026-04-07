import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';

import { Button } from '@/components/ui/button';
import { WithCheckboxItems } from '@/components/ui/dropdown/dropdown.stories';
import { WorldPeasHomepage } from '@/components/ui/world-peas/world-peas-homepage';

import { PaletteTree } from './palette';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/WorldPeasHomepage">
        <WorldPeasHomepage />
      </ComponentPreview>
      <ComponentPreview path="/Button">
        <Button />
      </ComponentPreview>
      <ComponentPreview path="/WithCheckboxItems">
        <WithCheckboxItems />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
