export function updateValue(object, newValue, id) {
  if (Array.isArray(object)) {
    object.forEach((item) => updateValue(item, newValue, id));
  } else if (typeof object === 'object') {
    object &&
      Object?.entries(object)?.forEach(([key, value]) => {
        if (value && value === id) {
          object[key] = newValue;
        } else {
          updateValue(value, newValue, id);
        }
      });
  }
  return object;
}

export function updateValueWithTwoCondition(object, key1, key2, condition1, condition2, newKey, newValue) {
  if (Array.isArray(object)) {
    object.forEach((item) => updateValueWithTwoCondition(item, key1, key2, condition1, condition2, newKey, newValue));
  } else if (typeof object === 'object') {
    if (object[key1] && object[key2] && object[key1] === condition1 && object[key2] === condition2) {
      object[newKey] = newValue;
    } else {
      object &&
        Object.entries(object).forEach(([key, value]) => {
          if (value && typeof value === 'object') {
            updateValueWithTwoCondition(value, key1, key2, condition1, condition2, newKey, newValue);
          }
        });
    }
  }
  return object;
}
