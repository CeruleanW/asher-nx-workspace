import { Select } from '@root/shared/components/atomics/Select';
import {isFilledArray} from '@root/shared/utils';

/**
 * Select box from a list of boxes
 */
export function BoxSelector({boxes, onChange, ...optionals}) {
  const {isMulti = true, } = optionals;

  if (!isFilledArray(boxes)) {
    return null;
  }

  const boxOptions = boxes.map((tag) => {
    return { value: tag._id, label: tag.name };
  });

  return (
    <div className="flex w-full mb-4 item-center">
    <label className="mr-2 flex items-center font-semibold">Box:</label>
    <div className=" flex-1">
      <Select options={boxOptions} isMulti={isMulti} onChange={onChange} />
    </div>
  </div>
  )
}
